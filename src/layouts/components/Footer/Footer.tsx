import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom'
import images from 'assets/images'

const cx = classNames.bind(styles)

const Footer = (props: any) => {
  return (
    <footer className='text-center text-lg-start text-dark' style={{ backgroundColor: '#ECEFF1' }}>
      <section>
        <div className='container text-center text-md-start pt-4'>
          {/* Grid row */}
          <div className='row mt-3'>
            {/* Grid column */}
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              {/* Content */}
              {/* <h6 className='text-uppercase fw-bold'>Company name</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }}
              /> */}
              <div className='mb-3'>
                <img src={images.logoMogi} width={'96'} height={'32'} alt='Mogi' />
              </div>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              {/* Links */}
              <h6 className='text-uppercase fw-bold'>Products</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }}
              />
              <p>
                <Link to='#!' className='text-dark'>
                  MDBootstrap
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  MDWordPress
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  BrandFlow
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  Bootstrap Angular
                </Link>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              {/* Links */}
              <h6 className='text-uppercase fw-bold'>Useful links</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }}
              />
              <p>
                <Link to='#!' className='text-dark'>
                  Your Account
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  Become an Affiliate
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  Shipping Rates
                </Link>
              </p>
              <p>
                <Link to='#!' className='text-dark'>
                  Help
                </Link>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              {/* Links */}
              <h6 className='text-uppercase fw-bold'>Contact</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }}
              />
              <p>
                <i className='fas fa-home mr-3' /> New York, NY 10012, US
              </p>
              <p>
                <i className='fas fa-envelope mr-3' /> info@example.com
              </p>
              <p>
                <i className='fas fa-phone mr-3' /> + 01 234 567 88
              </p>
              <p>
                <i className='fas fa-print mr-3' /> + 01 234 567 89
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <Link className='text-dark' to='https://mdbootstrap.com/'>
          MDBootstrap.com
        </Link>
      </div>
    </footer>
  )
}

export default Footer
