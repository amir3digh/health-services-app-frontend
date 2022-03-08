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
`

export { className, styles };
