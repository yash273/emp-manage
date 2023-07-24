export const email: RegExp = /^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/
export const name: RegExp = /^[a-zA-Z_-]+$/
export const pass: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
export const mob: RegExp = /^[0-9]{1,10}$/