import { createClient } from "contentful";
import Image from "next/image";

export default function BookDetails({book}) {
  console.log(book);
  const {title, author, overview, slug, thumbnail} = book[0].fields;
  const about_book = overview.content[0].content.reduce((acc,ele)=>{  
    return acc+ele.value;
  },"")
  // console.log(overview);
  const img_url = 'https:'+thumbnail.fields?.file?.url;
  return (
    <div className="page-content">
      <div className="card-image-thumbnail">
          <Image
              src={img_url}
              width={thumbnail.fields?.file?.details?.image?.width}
              height={thumbnail.fields?.file?.details?.image?.height}
              alt={title}
          />
      </div>
      <div className="content">
          <div className="actions">
              <div className="info">
                  <h4>{title}</h4>
                  <h4>{author}</h4>
              </div>
          </div>
          <div>
            <p>
              {about_book}
            </p>
          </div>
      </div>
  </div>
  )
}

const client = createClient({
  space:`${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken:`${process.env.CONTENTFUL_ACCESS_KEY}`

});

export async function getStaticProps({params}) {
  // console.log(params.slug);
  const slug = params.slug
  const {items} = await client.getEntries({content_type:'book','fields.slug':`${slug}`})
  
  if (!items.length){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  return {
    props:{
      book:items
    },
    revalidate:3
  }

}

export async function getStaticPaths () {
  
  const response = await client.getEntries({content_type:'book'})
  const paths = response.items.map((book)=>{
    return {
      params:{slug:`${book?.fields?.slug}`}
    }
  })
  return {
    paths,
    fallback:false
  }
}