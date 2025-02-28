import Link from "next/link";
import Image from "next/image";

export default function BooksCard ({book}) {
    const {title, author, overview, slug, thumbnail} = book.fields;
    // console.log('https:'+thumbnail.fields?.file?.url);
    const img_url = 'https:'+thumbnail.fields?.file?.url;
    // console.log(img_url)
    if (!img_url) return <h1>Loading Books.....</h1>
    return (
        <>
            <div className="card">
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
                        <Link href={'/books/'+slug}>
                        <div className="info">
                            <h4>{title}</h4>
                            <h4>{author}</h4>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}