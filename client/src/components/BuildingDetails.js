import React from 'react';
import { Drawer } from 'antd';

export default function BuildingDetails(props) {
  const { visible, onClose, details } = props;
  return (
    <Drawer
      placement="right"
      mask={false}
      visible={visible}
      onClose={onClose}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      {details ? (
        <div>
          <p>
            <strong>Adresa</strong> {details.address}
          </p>
          <p>
            <strong>Anul constructiei</strong> {details.year_built}
          </p>
          <p>
            <strong>Regimul de intaltime</strong> {details.height_regime}
          </p>
          <p>
            <strong>Suprafata desfasurata</strong> {details.surface} mp
          </p>
          <p>
            <strong>Clasa de risc</strong> {details.risk_category}
          </p>
          <p>
            <strong>Anul expertizei seismice</strong> {details.examination_year}
          </p>
          <p>
            <strong>Numele expertului evaluator</strong> {details.certified_expert}
          </p>
        </div>
      ) : (
        <p>Fara informatii</p>
      )}
    </Drawer>
  );
}
