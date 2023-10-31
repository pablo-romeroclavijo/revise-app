const db = require('../database/connect')
const deployURL = 'http://localhost:3000'

class Link {
    constructor({link_id, user_id, url}){
        this.linkID = link_id
        this.userID = user_id
        this.url = url
    }

static async getOneByUserID(userID){
    const response  = await db.query('SELECT * from share_links WHERE user_id = $1', [userID])

    let link
    if(response.rows == 0){
        link = await Link.generate(userID)
    }else{
        link = new Link(response.rows[0])
    }
    return link
}

static async generate(userID){
    const code = Link.makeid(12)

    const linkURL = deployURL + '/link/' + code

    const query = 'INSERT INTO share_links (user_id, url) VALUES ($1, $2) RETURNING *'
    const params = [userID, linkURL ]
    const response = await db.query(query, params)

    if(response == 0){
        throw new Error ('Unable to create link')
    }else{
        return new Link (response.rows[0])
    }
}

static makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

static async getOneByCode(code){

    const linkURL = deployURL + '/link/' + code
    const response = await db.query('SELECT * FROM share_links WHERE url = $1', [linkURL])

    if(response == 0){
        throw new Error ('Unable to locate shared calendar')
    }else{
        return new Link (response.rows[0])
    }

    

}



}

module.exports = Link