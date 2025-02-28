import { createClient } from "contentful";
import BooksCard from "../components/BooksCard";
export default function Books({books}) {
  // console.log(books)
  return (<>
    <div>
      <h2>Books List</h2>
    </div>
    <div className="books-list">
      {
        books.map((book)=>{
          return (
            <div>
              <BooksCard key={book.sys.id} book={book}/>
            </div>
          )
        })
      }
    </div>
  </>
  )
}

export async function getStaticProps () {
  const client = createClient({
    space:`${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken:`${process.env.CONTENTFUL_ACCESS_KEY}`

  });
  const response = await client.getEntries({content_type:'book'})
  return {
    props:{
      books:response.items
    }
  }
}
