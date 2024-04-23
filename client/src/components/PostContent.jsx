import React from "react";

const Img = ({url, caption}) => {
    return (
        <figure className="figure">
            <img className="figure-img img-fluid rounded-2xl" src={url} alt={caption} />
            {
                caption.length ? <figcaption className="figure-caption text-muted w-full my-3 text-center bg-white/10 xsm:py-4 rounded-xl xsm:rounded-2xl">{caption}</figcaption> : ""
            }
        </figure>
    )
}

const Quote = ({quote, caption}) => {
    return (
        <figure className="figure bg-purple/10 xsm:p-3 pl-5 border-l-4 border-purple rounded-xl xsm:rounded-2xl">
            <p dangerouslySetInnerHTML={{__html: quote}}></p>
            {
                caption.length ? <figcaption className="figure-caption text-muted w-full my-3 text-center bg-white/10 py-4 rounded-2xl">{caption}</figcaption> : ""
            }
        </figure>
    )
}

const List = ({style, items}) => {
    return (
        <ol className={`ml-12 xsm:ml-16 ${style == "ordered" ? " list-decimal" : " list-disc"}`}>
            {
                items.map((item, index) => {
                    return (
                        <li key={index} dangerouslySetInnerHTML={{__html: item}} className="leading-[28px] md:leading-[34px] lg:leading-[40px]"></li>
                    )
                })
            }
        </ol>
    )
}

const PostContent = ({ block }) => {
  let { type, data } = block;

  if (type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }} className="leading-[28px] md:leading-[32px] lg:leading-[40px]"></p>;
  }
  if (type == "header") {
    if (data.level == 3) {
      return (
        <h2
          className="post-h2 text-[32px] leading-loose max-md:text-2xl max-md:leading-normal !important"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h2>
      );
    }
    return (
      <h1
        className="post-h1 text-[45px] h1 font-candela leading-normal max-md:text-3xl max-md:leading-snug !important"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h1>
    );
  }

  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} />
  }
  if (type == "quote") {
    return <Quote quote={data.text} caption={data.caption} />
  }
  if (type == "list") {
    return <List style={data.style} items={data.items} />
  }
};

export default PostContent;
