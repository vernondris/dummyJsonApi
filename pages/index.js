import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { React, useEffect, useState } from "react";

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default function Home({ allData }) {
  /**
   * initial   
   */
  const [initial, setInitial] = useState(true);

  /**
   * pagination
   */
  const [pagination, setPagination] = useState(0);

  /**
   * pagination type
   */
  const [paginationType, setPaginationType] = useState(0);

  /**
   * loding indicator
   */
  const [loading, setLoading] = useState(false);

  /**
  * for image url
  */
  const [imageURL, setimageURL] = useState("/favicon.ico");

  /**
   * input field keyword onchage
   */
  const [search, setSearch] = useState("");

  /**
  * get all data array
  */
  const [data, setdata] = useState([]);

  /**
   * loop over the cities
   */
  let [filteredData, setFilteredData] = useState([]);

  /**
    * Fetch api
  */
  useEffect(() => {
    setLoading(true);
    fetch(`https://my-json-server.typicode.com/vernondris/mockjson2/data`)
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
  * fetch this effect while entering the keywords
  */
  useEffect(() => {
    if (search) {
      setInitial(false);
    }
    if (initial == false) {
      if (search == "") {
        paginationImp(1);
        return;
      }
      setFilteredData(
        data.filter((data) =>
          data.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    else {
      paginationImp(1);
    }
  }, [search, data]);

  /**
  * Implement pagination
  */
  const paginationImp = async (e) => {
    if (e <= 0 || e > data.length) {
      return;
    }

    setPagination(e);
    let firstRecord = e
    let lastRecord = firstRecord + 2

    setFilteredData(
      data.filter((data) =>
        (data.id >= firstRecord && data.id <= lastRecord)
      ));
  }

  /**
  * Implement pagination Previous
  */
  const paginationPrevious = async (e) => {
    let count = parseInt(pagination) - 3
    paginationImp(count);
  }

  /**
  * Implement pagination Forward
  */
  const paginationForward = async (e) => {
    let count = parseInt(pagination) + 3
    paginationImp(count);
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> <span className="visually-hidden">Loading...</span></div></div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Search On Fake Server</title>
      </Head>
      <main className={styles.main}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div className="modal-dialog">
            <div className="modal-content"> <div className="modal-header bg-success"> <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div className="modal-body bg-success text-center"> <Image className="centerer" src={imageURL} alt="Workflow" width={370} height={370} /> </div>
            </div>
          </div>
          </div>
        </div>

        <div className="bg-success mt-3 p-3 border for-mobile">
          <div className="input-group mb-3">
            <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control col-xs-4" placeholder="type your search keywords here..." />
            <button className="btn bg-light" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg></button> </div>
          <br></br>

          <div className="row">
            <div className="col-lg-2 fw-bold justify-content-center text-white d-none d-sm-block border text-center">id</div>
            <div className="col fw-bold justify-content-center text-white d-none d-sm-block border text-center">title</div>
            <div className="col-sm fw-bold justify-content-center text-white d-none d-sm-block border text-center">thumbnail</div>
          </div>

          {filteredData.map(data => (
            <div className="row position-relative" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setimageURL(data.thumbnail)}>
              <div className="col-lg-2 text-white border d-none d-sm-block text-center">{data.id}</div>
              <div className="col text-white border text-center text-left">  <span className="badge bg-secondary text-white border d-lg-none text-left position-absolute top-0 start-0">{data.id}</span>&nbsp;&nbsp;&nbsp; {data.title}</div>
              <div className="col-sm text-white border text-center"><Image
                src={data.thumbnail}
                alt="Workflow"
                width={140} height={140}
              /></div>
            </div>
          ))}

        </div>
        <br></br>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled" onClick={() => paginationImp(1)}>
              <button className="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              </svg></button>
            </li>
            <li className="page-item disabled" onClick={() => paginationPrevious()}>
              <button className="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z" />
              </svg></button>
            </li>
            <li className="page-item" onClick={() => paginationImp(1)}><a className="page-link" href="#">1</a></li>
            <li className="page-item" onClick={() => paginationImp(4)}><a className="page-link" href="#">2</a></li>
            <li className="page-item" onClick={() => paginationImp(7)}><a className="page-link" href="#">3</a></li>
            <li className="page-item d-none d-sm-block" onClick={() => paginationImp(10)}><a className="page-link" href="#">4</a></li>
            <li className="page-item d-none d-sm-block" onClick={() => paginationImp(13)}><a className="page-link" href="#">5</a></li>
            <li className="page-item d-none d-sm-block" onClick={() => paginationImp(16)}><a className="page-link" href="#">6</a></li>
            <li className="page-item d-none d-sm-block" onClick={() => paginationImp(19)}><a className="page-link" href="#">7</a></li>
            <li className="page-item d-none d-sm-block" onClick={() => paginationImp(22)}><a className="page-link" href="#">8</a></li>
            <li className="page-item disabled" onClick={() => paginationForward()}>
              <button className="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" />
              </svg></button>
            </li>
            <li className="page-item disabled" onClick={() => paginationImp(22)}>
              <button className="btn btn-success" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg></button>
            </li>
          </ul>
        </nav>

      </main>
    </div>
  )
}