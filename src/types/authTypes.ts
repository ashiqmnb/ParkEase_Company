export interface LoginCredential {
	email: string;
	password: string;
}


export interface RegisterCredential {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}


export interface verifyEmailCredentials {
	email: string;
	otp: string;
}


export interface ResetPwCredentials {
	email: string;
	newPassword: string;
}