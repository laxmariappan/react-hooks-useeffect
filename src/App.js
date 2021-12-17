import {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [limit, setLimit] = useState(4); // set default limit
  const [blogitems, setBlogitems] = useState(); 
  useEffect(()=>{
    async function getData(limit){
      const result = await fetch(`https://wordpress.org/news/wp-json/wp/v2/posts?per_page=${limit}`)
      const posts =  await result.json()
      setBlogitems(posts); // set blog items
    }
   getData(limit);
  },[limit]); // useEffect re-renders when the state of limit changes

  const inputEl = useRef(null); // useRef to refer the element on event
  const handleClick = () => {
    setLimit(inputEl.current.value); // current value = this.value
  }
  
// For onchange //
  const handleChange = (event) => {
    setLimit(event.target.value); // get value from event, target = element
  }

  return (
    <div className="">
<header className=" text-black body-font bg-gray-400 shadow">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <h1>React Hooks</h1>
  </div>
</header>
        

      <main className="p-10 mt-10">
        <section className="w-full bg-gray-200 p-10 mt-10">
          <h2 className="text-2xl my-2">Set Limit and click get data</h2>
          <label for="Limit">Limit</label>
        <input name="limit" id="limit" ref={inputEl} type="number" onChange={handleChange} /><button className="bg-blue-600 text-white p-2"  onClick={handleClick}>Get Data</button>
        <p className="float-none">Enter a number. E.g 5 to get 5 blog posts.</p>
        <div className="mt-10"></div>
        <h2 className="text-2xl">Blog results</h2>
        <div className="p-10">
          <ol className="list-decimal text-left">
            {blogitems?.map(function(blogitem,index){
              return(
                <li key={index}>{blogitem.title.rendered}</li>
              )
            })}
          </ol>
        </div>
        </section>
      </main>
    </div>
  );
}

export default App;
