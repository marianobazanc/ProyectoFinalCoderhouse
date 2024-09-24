import bcrypt from 'bcrypt'

export const createHash = password => {
    const passwordString = String(password); 
    const salt = bcrypt.genSaltSync(10); 
    return bcrypt.hashSync(passwordString, salt);
  };

export const isValidPassword= (password, user) =>
{
  try{
    return bcrypt.compareSync(password, user.password)
  }catch (err){
  }
  

}