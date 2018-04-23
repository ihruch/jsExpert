export default class GalleryModel {
    constructor() {
        this.getUrl = 'http://localhost:3000/usersList';
        this.usersListData = [];
    }

    getUserList() {
        return fetch(this.getUrl).then(responce => responce.json())
        .then(data => {
            console.log("Data is loaded");
            this.usersListData = data;
            return data;
        })         
    }

    getUserById(id) {
      return fetch(this.getUrl + "/" + id).then(responce => responce.json())
      .then(data => {
          return data;
      })         
    }
    
    saveUser(item) {         

    }
    
    updateUser(counter) {
      
    }

}
