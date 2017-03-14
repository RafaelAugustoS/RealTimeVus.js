<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Aplicação Real Time com Vue.js</h1>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add Livro</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Titulo:</label>
            <input type="text" id="bookTitle" class="form-control" v-model="newBook.title"> 
          </div>
          <div class="form-group">
            <label for="bookAuthor">Autor:</label>
            <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author"> 
          </div>
          <div class="form-group">
            <label for="bookUrl">URL:</label>
            <input type="text" id="bookUrl" class="form-control" v-model="newBook.url"> 
          </div>
          <input type="submit" class="btn btn-primary" value="Add Livro">
        </form>
      </div>
    </div>


    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Lista de Livros</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
              <td>
                <a v-bind:href="book.url">{{book.title}}</a>
              </td>
              <td>
                {{book.author}}
              </td>
              <td>
                <span class="glyphicon glyphicon-trash" v-on:click="removeBook(book)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Firebase from 'firebase'
import toastr from 'toastr'

let config = {
  // Configuração do BD
}

let app = Firebase.initializeApp(config);
let db = app.database();

let booksRef = db.ref('books');

export default {
  name: 'app',
  firebase: {
    books: booksRef
  },
  data(){
    return{
      newBook: {
        title: '',
        author: '',
        url: ''
      }
    }
  },
  methods: {
    addBook: function(){
      booksRef.push(this.newBook);
      this.newBook.title = '';
      this.newBook.author = '';
      this.newBook.url = '';
    },
    removeBook: function(book){
      booksRef.child(book['.key']).remove();
      toastr.success("Livro Removido");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
