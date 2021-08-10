import { useState, useEffect } from 'react';
import queryString from 'query-string';
import './App.scss';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';
import PostList from './component/PostList';
import Pagination from './component/Pagination';
import PostFiltersForm from './component/PostFiltersForm';
import Clock from './component/Clock';
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend!' },
    { id: 2, title: 'We love Easy Frontend!' },
    { id: 3, title: 'They love Easy Frontend!' },
  ]);
  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows:11
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  })

  useEffect(() => {
    async function fetchPostList() {
      const paramsString = queryString.stringify(filters);
      console.log({filters, paramsString});
      const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      console.log({responseJSON});

      const {data, pagination} = responseJSON;
      setPostList(data);
      setPagination(pagination);
    }

    fetchPostList()
    return () => {
      //cleanup
    };
  }, [filters]);

  function handlePageChange(newPage) {
    console.log('New Page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  function handleTodoClick(todo) {
    const newTodoList = todoList.filter(el => el.id !== todo.id)
    setTodoList(newTodoList)
  }

  function handleToDoFormSubmit(formValues) {
    console.log({formValues})
    const cloneTodoList = [...todoList];
    cloneTodoList.unshift({ id: ++todoList.length, title: formValues.title})
    setTodoList(cloneTodoList)
  }
  function handleFiltersChange(newFilters) {
    console.log(newFilters)
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
  }
  return (
    <div className="app">
      <div>Welcome to React Hooks</div>
      <Clock/>
      {/* <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/> */}
      {/* <TodoForm onSubmit={handleToDoFormSubmit}/>
      <TodoList
        todos={ todoList }
        onTodoClick={ handleTodoClick }
      /> */}
    </div>
  );
}

export default App;
