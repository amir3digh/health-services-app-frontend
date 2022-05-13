import css from 'styled-jsx/css'

const { className, styles } = css.resolve`
  .banner {
    position: relative;
    margin: 0 5px 28px 5px;
  }
  .bannerTitle {
    font-size: 28px;
    position: absolute;
    right: 0;
    margin-right: 23px;
  }
  .carousel {
    display: flex;
    align-items: center;
    padding: 60px 28px;
  }
  .carousel-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .carousel-body-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel > * {
    width: 100%;
  }
  .servicesItemBig,
  .servicesItemSmall {
    background-color: #fff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    border-radius: 24px;
    width: 100%;
    font-size: 15px;
    margin: 12px;
  }
  .servicesItemSmall {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: span 2;
    grid-template-rows: 45px 50px;
    padding-right: 23px;
    padding-left: 15px;
    padding-bottom: 23px;
    padding-top: 13px;
  }
  .servicesItemSmall .serviceIcon {
    grid-column: 2 / span 1;
    grid-row: 1 / span 2;
  }
  .servicesItemBig {
    grid-column: span 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 23px;
  }
  .servicesItemBig .serviceIcon{
    margin-left: 21px;
  }
  .link {
    grid-column: 1 / span 2;
    grid-row: 2 / span 2;
  }
  .fixTitle {
    font-size: 12px;
  }
  .serviceTitle {
    font-size: 15px;
  }
  .illustraion-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 135px;
    padding-bottom: 135px;
  }
  .explain-container {
    padding: 74px 0;
    background-color: #F2F2F2;
  }
  .explain {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .explain-box {
    width: 100%;
    height: 290px;
    background-color: #fff;
    border-radius: 59px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .contact-container {
    grid-column: 1 / span 12;
    background-color: #fff; 
    width: 100%;
    height: 290px;
    border-radius: 59px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .contact-title {
    grid-column: 1 / span 12;
    text-align: right;
    width: 100%;
  }
`

export { className, styles };
