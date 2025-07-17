// src/services/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  AuthError,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, COLLECTIONS } from './config';
import { User, LoginCredentials, RegisterData, ChangePasswordData } from '../../types/auth';

// Converter FirebaseUser para User customizado
export const convertFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  if (!firebaseUser) return null;

  try {
    // Buscar dados adicionais do Firestore
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid));
    const userData = userDoc.data();

    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: userData?.name || firebaseUser.displayName || 'Usuário',
      role: userData?.role || 'employee',
      avatar: userData?.avatar || firebaseUser.photoURL || undefined,
      phone: userData?.phone || undefined,
      createdAt: userData?.createdAt?.toDate() || new Date(),
      updatedAt: userData?.updatedAt?.toDate() || new Date(),
      lastLogin: userData?.lastLogin?.toDate() || new Date(),
      isActive: userData?.isActive ?? true,
    };
  } catch (error) {
    console.error('Erro ao converter usuário Firebase:', error);
    return null;
  }
};

// Login com email e senha
export const signInWithEmail = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const { email, password } = credentials;
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Atualizar último login
    await updateDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), {
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const user = await convertFirebaseUser(firebaseUser);
    if (!user) {
      throw new Error('Erro ao carregar dados do usuário');
    }

    console.log('✅ Login realizado com sucesso:', user.email);
    return user;
  } catch (error) {
    console.error('❌ Erro no login:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Registro de novo usuário
export const registerWithEmail = async (data: RegisterData): Promise<User> => {
  try {
    const { email, password, name, phone, role = 'employee' } = data;

    // Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Atualizar perfil do Firebase
    await updateProfile(firebaseUser, {
      displayName: name,
    });

    // Criar documento do usuário no Firestore
    const userData = {
      name,
      email,
      role,
      phone: phone || null,
      avatar: null,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    };

    await setDoc(doc(db, COLLECTIONS.USERS, firebaseUser.uid), userData);

    const user = await convertFirebaseUser(firebaseUser);
    if (!user) {
      throw new Error('Erro ao carregar dados do usuário');
    }

    console.log('✅ Usuário registrado com sucesso:', user.email);
    return user;
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Logout
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ Erro no logout:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Reset de senha
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('✅ Email de reset enviado para:', email);
  } catch (error) {
    console.error('❌ Erro ao enviar reset:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Atualizar perfil do usuário
export const updateUserProfile = async (userData: Partial<User>): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }

    // Atualizar no Firebase Auth se necessário
    if (userData.name) {
      await updateProfile(currentUser, {
        displayName: userData.name,
      });
    }

    // Atualizar no Firestore
    const updateData = {
      ...userData,
      updatedAt: serverTimestamp(),
    };

    // Remover campos que não devem ser atualizados diretamente
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.lastLogin;

    await updateDoc(doc(db, COLLECTIONS.USERS, currentUser.uid), updateData);
    console.log('✅ Perfil atualizado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Trocar senha
export const changePassword = async (passwordData: ChangePasswordData): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
      throw new Error('Usuário não autenticado');
    }

    const { currentPassword, newPassword } = passwordData;

    // Re-autenticar usuário
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);

    // Atualizar senha
    await updatePassword(currentUser, newPassword);

    console.log('✅ Senha alterada com sucesso');
  } catch (error) {
    console.error('❌ Erro ao alterar senha:', error);
    throw handleAuthError(error as AuthError);
  }
};

// Observar mudanças de autenticação
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await convertFirebaseUser(firebaseUser);
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Tratamento de erros de autenticação
const handleAuthError = (error: AuthError): Error => {
  let message = 'Erro desconhecido';

  switch (error.code) {
    case 'auth/user-not-found':
      message = 'Usuário não encontrado';
      break;
    case 'auth/wrong-password':
      message = 'Senha incorreta';
      break;
    case 'auth/email-already-in-use':
      message = 'Email já está em uso';
      break;
    case 'auth/weak-password':
      message = 'Senha muito fraca (mínimo 6 caracteres)';
      break;
    case 'auth/invalid-email':
      message = 'Email inválido';
      break;
    case 'auth/user-disabled':
      message = 'Usuário desabilitado';
      break;
    case 'auth/too-many-requests':
      message = 'Muitas tentativas. Tente novamente mais tarde';
      break;
    case 'auth/network-request-failed':
      message = 'Erro de conexão. Verifique sua internet';
      break;
    case 'auth/invalid-credential':
      message = 'Credenciais inválidas';
      break;
    case 'auth/requires-recent-login':
      message = 'Operação requer login recente';
      break;
    default:
      message = error.message || 'Erro de autenticação';
  }

  return new Error(message);
};

// Verificar se usuário é admin
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
    const userData = userDoc.data();
    return userData?.role === 'admin';
  } catch (error) {
    console.error('Erro ao verificar role do usuário:', error);
    return false;
  }
};

// Criar usuário admin inicial
export const createInitialAdmin = async (): Promise<void> => {
  try {
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'admin@pizzaria.com';
    const adminPassword = 'admin123456'; // Trocar depois!

    const adminData: RegisterData = {
      email: adminEmail,
      password: adminPassword,
      confirmPassword: adminPassword,
      name: 'Administrador',
      role: 'admin',
    };

    await registerWithEmail(adminData);
    console.log('✅ Admin inicial criado:', adminEmail);
  } catch (error) {
    console.log('ℹ️ Admin já existe ou erro ao criar:', (error as Error).message);
  }
};