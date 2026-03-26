export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return '이메일을 입력해주세요.';
  if (!regex.test(email)) return '이메일 형식이 올바르지 않습니다.';
  return true;
};

export const validateNickname = (nickname: string) => {
  if (!nickname) return '닉네임을 입력해주세요.';
  if (nickname.length < 2 || nickname.length > 10) return '닉네임은 2~10자리여야 합니다.';
  return true;
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
  if (!password) return '비밀번호를 입력해주세요.';
  if (/\s/.test(password)) return '비밀번호에 공백을 포함할 수 없습니다.';
  if (!regex.test(password)) return '비밀번호는 8~20자리 영문, 숫자, 특수문자 조합이어야 합니다.';
  return true;
};

export const validatePasswordConfirm = (password: string) => (passwordConfirm: string) => {
  if (!passwordConfirm) return '비밀번호 확인을 입력해주세요.';
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다.';
  return true;
};
