import React from 'react';
import { Row, Col } from 'antd';
import './statistics.css';

export default function Statistics() {
  return (
    <div className="statistics-wrapper">
      <Row type="flex" justify="center" gutter={[16, 16]} align="strech">
        <Col xs={24} md={8}>
          <div className="card">
            <p>6121</p>
            <p>oameni sub risc</p>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="card">
            <p>3</p>
            <p>cladiri evaluate</p>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="card">
            <p>84</p>
            <p>cladiri consolidate</p>
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle" gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <p className="info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati repudiandae minima
            quas ducimus corporis labore harum accusamus esse, deserunt doloremque eius, ipsa facere
            voluptatum suscipit officia pariatur. Reiciendis earum ea nesciunt. Sequi unde quidem
            consequatur obcaecati corporis veniam doloremque quisquam optio ratione? Explicabo
            debitis perspiciatis unde dicta nesciunt? Repudiandae, reprehenderit!
          </p>
        </Col>
        <Col xs={24} md={10}>
          <p className="info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati repudiandae minima
            quas ducimus corporis labore harum accusamus esse, deserunt doloremque eius, ipsa facere
            voluptatum suscipit officia pariatur. Reiciendis earum ea nesciunt. Sequi unde quidem
            consequatur obcaecati corporis veniam doloremque quisquam optio ratione? Explicabo
            debitis perspiciatis unde dicta nesciunt? Repudiandae, reprehenderit!
          </p>
        </Col>
      </Row>
    </div>
  );
}
