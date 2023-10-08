// VALIDATION

export function validateUsername(username) {
  const pattern = /^[\w]+$/;
  const patternMatches = pattern.test(username.trim());
  return patternMatches;
}

export function validateEmail(email) {
  const regEx = /^[\w\-.]+@(stud.)?noroff.no$/g;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

export function passwordValidation(password) {
  return password.trim().length >= 8;
}

export function newPasswordValidation(newPassword) {
  return newPassword.trim().length >= 8;
}

export function validateTitle(title) {
  const pattern = /^[\w]+$/;
  const patternMatches = pattern.test(title.trim());
  return patternMatches;
}

export function validateBody(body) {
  const pattern = /^[\w]+$/;
  const patternMatches = pattern.test(body.trim());
  return patternMatches;
}

export function validateTags(tags) {
  const pattern = /^[\w]+$/;
  const patternMatches = pattern.test(tags.trim());
  return patternMatches;
}



