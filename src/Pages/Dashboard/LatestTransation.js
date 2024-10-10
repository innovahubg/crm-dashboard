import React, { useState } from 'react';

import { Row, Col } from 'reactstrap';

import { LatestTransationData } from '../../CommonData/Data/index';
import moment from "moment"
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const LatestTransation = ({ customers }) => {
    const ordered = customers.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) });
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = ordered.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(ordered.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % ordered.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    return (
        <React.Fragment>

            <Col lg={10}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Ultimos registrados</h4>

                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap mb-0">

                                <thead>
                                    <tr>
                                        {/* <th scope="col" style={{ width: "50px" }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="customCheckall"></label>
                                            </div>
                                        </th> */}

                                        <th scope="col">Nombre</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Numero</th>
                                        <th scope="col">Creado</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, key) => (<tr key={key}>
                                        {/* <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}></label>
                                            </div>
                                        </td> */}
                                        <td>
                                            {item.name} {item.lastName}
                                        </td>

                                        <td>{item.email}</td>


                                        <td>
                                            {item.phone}
                                        </td>
                                        <td>
                                            {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                                        </td>

                                        <td>
                                            <Link to={`/leads/${item.id}`}>
                                                <button type="button" className="btn btn-outline-info btn-sm me-1">Detalles</button>
                                            </Link>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Sig. >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={10}
                                pageCount={pageCount}
                                previousLabel="< Ant."
                                renderOnZeroPageCount={null}
                                className='reactPaginate'
                                activeClassName="reactPaginate-active"
                            />
                        </div>
                    </div>
                </div>
            </Col>

        </React.Fragment>
    )
}

export default LatestTransation;

