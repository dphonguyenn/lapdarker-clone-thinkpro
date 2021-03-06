import { useState, useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { devices } from './data.js';
import { Button, Typography, IconButton, Container } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useStyles from './styles.js';
import { ThemeContext } from '../../context/ThemeContext.js';
import { hoverComponentState } from '../../redux/selectors';
import { useSelector } from 'react-redux';
// import { getDetailedDevice, getDevices } from '../../redux/actions/index.js';
// import { getAbsolutePath, getEndPointURL } from '../../helpers/index.js';

const styles = {
  box: {
    p: '6px 0px',
    bgcolor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 0 #0000, 0 0 #0000, 0px 0px 12px rgba(0, 0, 0, 0.06)',
    zIndex: 2
  },
  btn_device: {
    padding: '0',
    margin: '0 4px',
    borderRadius: '8px'
  },
  text_btn_device: {
    p: '8px',
    color: 'black',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'initial'
  }
};

function SubHeader() {
  const classes = useStyles();
  const [selectedItemSubmenu, setSelectedItemSubmenu] = useState('Laptop');
  const [showSubHeader, setShowSubHeader] = useState(true);
  const [idxSlider, setIdxSlider] = useState(0);
  const globalState = useContext(ThemeContext);
  const isHoverComponent = useSelector(hoverComponentState);

  useEffect(() => {
    if (globalState.isScrollDown === true) {
      setShowSubHeader(false);
    } else {
      setShowSubHeader(true);
    }
  }, [globalState.isScrollDown, isHoverComponent, showSubHeader]);

  const elm_slider1 = devices.slice(0, 7);
  const elm_slider2 = devices.slice(6);

  // const dispatch = useDispatch();
  // const location = useLocation();
  // const navigate = useNavigate();

  // const pathname = localStorage.getItem('_pathname');

  const redirectTypeProductPage = useCallback(
    (name, url) => {
      setSelectedItemSubmenu(name);
      // dispatch(getDevices.getDevicesRequest(getEndPointURL(location.pathname)));
      // navigate(`/product/${url}`);
    },
    [setSelectedItemSubmenu]
  );

  const subheader = (
    <Box sx={styles.box} position="fixed" left="0" right="0" top="80px">
      <Container
        maxWidth="lg"
        sx={{
          '& .carousel-root': {
            width: '92%'
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative'
          }}
        >
          <Carousel
            style={{ justifyContent: 'start' }}
            selectedItem={idxSlider}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
          >
            <div className={classes.group_btn_devices}>
              {elm_slider1.map((device, index) => {
                return (
                  <Link key={index} to={`/product/${device.url}`} style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        padding: '0',
                        margin: '0 4px',
                        borderRadius: '8px',
                        bgcolor: device.name === selectedItemSubmenu ? '#ECF0F4' : 'transparent',
                        display: 'flex'
                      }}
                      onClick={() => redirectTypeProductPage(device.name, device.url)}
                    >
                      <img className={classes.img} src={device.img} alt={device.name} />
                      <Typography sx={styles.text_btn_device} variant="body2">
                        {device.name}
                      </Typography>
                    </Button>
                  </Link>
                );
              })}
            </div>
            <div className={classes.group_btn_devices}>
              {elm_slider2.map((device, index) => {
                return (
                  <Link key={index} to={`/product/${device.url}`} style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        padding: '0',
                        margin: '0 4px',
                        borderRadius: '8px',
                        bgcolor: device.name === selectedItemSubmenu ? '#ECF0F4' : 'transparent'
                      }}
                      onClick={() => redirectTypeProductPage(device.name, device.url)}
                    >
                      <img className={classes.img} src={device.img} alt={device.name} />
                      <Typography sx={styles.text_btn_device} variant="body2">
                        {device.name}
                      </Typography>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </Carousel>
          <div style={{ display: 'flex', position: ' absolute', right: '0', top: '4px' }}>
            <IconButton onClick={() => setIdxSlider(0)} sx={{ bgcolor: '#f8fafc' }} disabled={idxSlider === 0}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              onClick={() => setIdxSlider(1)}
              sx={{ bgcolor: '#f8fafc', ml: '6px' }}
              disabled={idxSlider === 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>
      </Container>
    </Box>
  );

  const none_subheader = <div></div>;

  return showSubHeader ? subheader : none_subheader;
}

export default SubHeader;
