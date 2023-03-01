/// <reference types="cypress" />

import { apiCommands } from "../support/api_commands"

describe('Trello', () => {

  it('Create a board', function () {

    apiCommands.deleteAllBoards().then( () => {
      apiCommands.getAllBoards().then( boards => {
        expect(Object.keys(boards)).to.have.length(0)
      })
    })

    apiCommands.createBoard('Jm1')
    apiCommands.createBoard('Jm2')
      .then( board => {
        
        expect(board.name).to.eql('Jm2')
        expect(board.closed).to.eql(false)
        apiCommands.createList('ToDoJm', board.id).then( toDo => {
          
          expect(toDo.name).to.eql('ToDoJm')
          expect(toDo.closed).to.eql(false)
          apiCommands.createCard('Learning Postman', toDo.id).then( card => {

            expect(card.name).to.eql('Learning Postman')
            expect(card.idList).to.eql(toDo.id)
            expect(card.idBoard).to.eql(board.id)
            apiCommands.createList('DoneJm', board.id).then( done => {
              
              expect(done.name).to.eql('DoneJm')
              expect(done.closed).to.eql(false)
              apiCommands.updateCard(card.id, done.id).then( card => {
                
                expect(card.name).to.eql('Learning Postman')
                expect(card.idList).to.eql(done.id)
                apiCommands.getAllBoards().then( boards => {
                  
                  expect(Object.keys(boards)).to.have.length(2)
                })
                
                apiCommands.deleteAllBoards().then( () => {
                  apiCommands.getAllBoards().then( boards => {
                    expect(Object.keys(boards)).to.have.length(0)
                  })
                })
              })
            })
          })
        })
      })
  })
})