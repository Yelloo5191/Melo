import React from 'react';
import { Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import contentData from '../utils/contentData';

library.add(faLink);

const Content = () => (
  <div className="next-steps my-5" data-testid="content">
    <h2 className="my-5 text-center" data-testid="content-title">
      What can I do next?
    </h2>
    <Row className="d-flex justify-content-between" data-testid="content-items">
      {contentData.map((col, i) => (
        <Col key={i} md={5} className="mb-4">
          <h6 className="mb-3">
            <a href={col.link}>
              <FontAwesomeIcon icon="link" className="mr-2" />
              {col.title}
            </a>
          </h6>
          <p>{col.description}</p>
        </Col>
      ))}
    </Row>
  </div>
);

export default Content;
