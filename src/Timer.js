import React, { useState, useEffect } from 'react';
import { Button, Col, Progress, Row, Calendar, Radio } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import background from './Components/Timer/Assets/Images/ab.jpeg';
import { workDays } from './Components/Timer/Assets/Images/dates';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [view, setView] = useState('Timer');
  const [value, setValue] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const targetDate = new Date('2025-05-30T23:59:59');
      const diff = targetDate - currentDate;

      if (diff <= 0) {
        clearInterval(intervalId);
        setTimeRemaining({
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const weeks = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
      );
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const style = {
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${background})`,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const calendarStyle = {
    backgroundImage: `url(${background})`,
    margin: '3px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    height: '100vh !important',
  };
  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in ISO format (YYYY-MM-DD)

    if (workDays.includes(formattedDate) && formattedDate >= currentDate) {
      return (
        <Button
          style={{
            backgroundColor: 'rgb(142, 36, 170)',
            borderColor: 'rgb(142, 36, 170)',
            float: 'right',
          }}
          size='small'
          type='primary'
          shape='circle'
          icon={<CarOutlined />}
        />
      );
    }

    return null;
  };
  const handleView = (e) => {
    setView(e.target.value);
  };
  const onSelect = (val) => {
    let date = val.format('YYYY-MM-DD');
    setValue([...value, date]);
  };
  return (
    <div style={view === 'Timer' ? style : calendarStyle}>
      <div style={{ float: 'right' }}>
        <Radio.Group
          defaultValue='Timer'
          buttonStyle='solid'
          onChange={handleView}
        >
          <Radio.Button value='Timer'>Timer</Radio.Button>
          <Radio.Button value='Calendar'>Calendar </Radio.Button>
        </Radio.Group>
      </div>

      <br />
      <p />
      {view === 'Timer' ? (
        <>
          <h1>🌃Home Sweet Home🚛</h1>.
          <Row
            justify={'center'}
            gutter={24}
            style={{
              color: 'white',
            }}
          >
            {timeRemaining.years > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0', color: 'white' }}>
                  <Progress
                    style={{ color: 'white' }}
                    type='circle'
                    percent={Math.round((timeRemaining.years * 100) / 12)}
                    format={() => `${timeRemaining.years} Years`}
                  />
                </div>
              </Col>
            )}
            {timeRemaining.months > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0' }}>
                  <Progress
                    type='circle'
                    percent={timeRemaining.months}
                    format={() => `${timeRemaining.months} Months`}
                    strokeColor={'#1b6535'}
                  />
                </div>
              </Col>
            )}
            {timeRemaining.weeks > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0' }}>
                  <Progress
                    type='circle'
                    percent={Math.round((timeRemaining.weeks * 100) / 4)}
                    format={() => `${timeRemaining.weeks} Weeks`}
                    strokeColor={'#77c593'}
                  />
                </div>
              </Col>
            )}
            {timeRemaining.days > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0' }}>
                  <Progress
                    type='circle'
                    percent={Math.round((timeRemaining.days * 100) / 31)}
                    format={() => `${timeRemaining.days} Days`}
                    strokeColor={'#3a6b35'}
                  />
                </div>
              </Col>
            )}
            {timeRemaining.hours > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0' }}>
                  <Progress
                    type='circle'
                    percent={Math.round((timeRemaining.hours * 100) / 24)}
                    format={() => `${timeRemaining.hours} Hours`}
                    strokeColor={'pink'}
                  />
                </div>
              </Col>
            )}
            {timeRemaining.minutes > 0 && (
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{ margin: '16px 0' }}>
                  <Progress
                    type='circle'
                    percent={Math.round((timeRemaining.minutes * 100) / 60)}
                    format={() => `${timeRemaining.minutes} Min`}
                    strokeColor={'purple'}
                  />
                </div>
              </Col>
            )}
            <Col lg={4} md={12} sm={12} xs={12}>
              {' '}
              <div style={{ margin: '16px 0' }}>
                <Progress
                  type='circle'
                  percent={Math.round((timeRemaining.seconds * 100) / 60)}
                  format={() => `${timeRemaining.seconds} Sec`}
                  //   strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                  strokeColor={{ '0%': '#2eb82e', '100%': 'green' }}
                />
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      )}
    </div>
  );
};

export default Timer;
