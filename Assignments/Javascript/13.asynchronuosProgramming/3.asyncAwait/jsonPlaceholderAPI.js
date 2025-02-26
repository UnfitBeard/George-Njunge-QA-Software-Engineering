// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))//{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }

      //check axios too

      //using promises to fetch data

      // const promise = fetch('https://jsonplaceholder.typicode.com/todos/1')
      // promise.then(response => response.json())
      // .then(jsonData => console.log(jsonData)) //{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }

      async function fetchData() {
            try {
                  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                  const dataJSON = await response.json()
                  console.log(dataJSON)
            } catch (error) {
                  console.error(error.message)
            }
      }
      fetchData() //{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }
      