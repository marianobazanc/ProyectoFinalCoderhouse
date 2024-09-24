class UserDTO {
    constructor(newUser){

        this._id= newUser._id
        this.full_name  = `${newUser.firts_name} ${newUser.last_name}`
        this.email  = newUser.email
        this.role  = newUser.role
    }
}

export default UserDTO

