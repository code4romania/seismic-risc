import React from "react";
import { Row, Col } from "antd";
import facebookLogo from "../../images/facebook_grey.png";
import instagramLogo from "../../images/instagram_grey.png";
import linkedinLogo from "../../images/linkedin_grey.png";
import twitterLogo from "../../images/twitter_grey.png";

const socialBarStyle = {
  backgroundColor: "#F0F0F0"
};

const donateLinkStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontFamily: "Titillium Web",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "24px",
  height: "100%",
  background: "rgba(31, 185, 74, 0.7)",
  borderRadius: "3px",
  textDecoration: "none",
  textTransform: "uppercase",
  marginRight: "5px"
};

const socialImageStyle = {
  width: "100%",
  height: "100%"
};

const SocialBar = () => {
  return (
    <div style={socialBarStyle}>
      <Row type="flex" justify="end" gutter={2}>
        <Col md={1} sm={2} xs={3}>
          <a
            // style={socialLinkStyle}
            href="https://www.facebook.com/code4romania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookLogo} style={socialImageStyle} alt="Facebook" />
          </a>
        </Col>
        <Col md={1} sm={2} xs={3}>
          <a
            // style={socialLinkStyle}
            href="https://www.instagram.com/code4romania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramLogo} style={socialImageStyle} alt="Instagram" />
          </a>
        </Col>
        <Col md={1} sm={2} xs={3}>
          <a
            // style={socialLinkStyle}
            href="https://www.linkedin.com/company/code4romania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} style={socialImageStyle} alt="LinkedIn" />
          </a>
        </Col>
        <Col md={1} sm={2} xs={3}>
          <a
            // style={socialLinkStyle}
            href="https://twitter.com/Code4Romania"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterLogo} style={socialImageStyle} alt="Twitter" />
          </a>
        </Col>

        <Col md={4} sm={4} xs={12}>
          <a
            style={donateLinkStyle}
            target="_blank"
            rel="noopener noreferrer"
            href="https://code4.ro/ro/doneaza/"
          >
            DONEAZĂ
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default SocialBar;
