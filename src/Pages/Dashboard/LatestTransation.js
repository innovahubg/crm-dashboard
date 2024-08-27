import React from 'react';

import { Row, Col } from 'reactstrap';

import { LatestTransationData } from '../../CommonData/Data/index';
import moment from "moment"

const LatestTransation = ({ customers }) => {
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
                                        <th scope="col" style={{ width: "50px" }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="customCheckall"></label>
                                            </div>
                                        </th>

                                        <th scope="col">Nombre</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Numero</th>
                                        <th scope="col">Creado</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((item, key) => (<tr key={key}>
                                        <td>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id={item.id}
                                                />
                                                <label className="form-check-label" htmlFor={item.id}></label>
                                            </div>
                                        </td>
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
                                            <button type="button" className="btn btn-outline-success btn-sm me-1">Edit</button>
                                            <button type="button" className="btn btn-outline-danger btn-sm me-1">Cancel</button>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Col>

        </React.Fragment>
    )
}

export default LatestTransation;

