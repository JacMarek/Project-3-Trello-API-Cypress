class ApiCommands {

    organizationId = '63866601829e1b059ba02b5d'
    
    getApiData() {
        return cy.fixture("endpointsCredentials")
    }
    
    createBoard(name) {

        return this.getApiData().then( apiData => {
            
            cy.request({
                method: "POST",
                url: "/" +apiData.boards+ '?name=' +name+ '&key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })
    }

    createList(name, boardId) {

        return this.getApiData().then( apiData => {
            
            cy.request({
                method: "POST",
                url: "/" +apiData.lists+ '?name=' +name+ '&idBoard=' +boardId+ '&key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })

    }

    createCard(name, listId) {

        return this.getApiData().then( apiData => {
            
            cy.request({
                method: "POST",
                url: "/" +apiData.cards+ '?name=' +name+ '&idList=' +listId+ '&key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })
    }

    updateCard(cardId, listId) {

        return this.getApiData().then( apiData => {
            
            cy.request({
                method: "PUT",
                url: "/" +apiData.cards+cardId+ '?idList=' +listId+ '&key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })
    }

    deleteBoard(boardId) {

        this.getApiData().then( apiData => {
            
            cy.request({
                method: "DELETE",
                url: "/" +apiData.boards+boardId+ '?key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })
    }

    getAllBoards() {

        return this.getApiData().then( apiData => {
            
            cy.request({
                method: "GET",
                url: "/" +apiData.organizations+this.organizationId+ '/boards' + '?key=' +apiData.key+ '&token=' +apiData.token
            }).then( response => {
                expect(response.status).to.equal(200)
            }).its('body')
        })
    }

    deleteAllBoards() {

        return this.getApiData().then( apiData => {
            
            this.getAllBoards().then( boards => {
                
                if (Object.keys(boards).length > 0) {

                    this.deleteBoard(boards[0].id)
                    this.deleteAllBoards()
                }
            })
        })
    }
}

export const apiCommands = new ApiCommands