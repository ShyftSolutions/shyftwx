import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import { makeStyles, Button as Button$1, ButtonGroup, Grid, Typography, List, ListItem, ListItemText, Box, Collapse, ListItemIcon, Fab, createMuiTheme, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import { Map, ImageOverlay, TileLayer } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles as makeStyles$1 } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const getIndexAsync = url => {
  return fetch(url).then(response => response.json());
};
const getProductDataAsync = (url, region, run) => {
  url = `${url}/${run}-${region}`;
  return fetch(url).then(response => response.json());
};

var index = {
    __proto__: null,
    getIndexAsync: getIndexAsync,
    getProductDataAsync: getProductDataAsync
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '200%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    variant: 'contained',
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    ariaLabel: "back"
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}));
const BackButton = ({
  action
}) => {
  const classes = useStyles();
  return /*#__PURE__*/React.createElement(Button, {
    onClick: action,
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateBeforeIcon, {
    className: classes.icon
  }));
};

const useStyles$1 = makeStyles(theme => ({
  root: {
    height: '40vw',
    width: '100%'
  },
  paddingMiddle: {
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 15
  }
}));
const BaseWxViewer = ({
  layers,
  neBounds,
  swBounds
}) => {
  const classes = useStyles$1();
  const bounds = latLngBounds(swBounds, neBounds);
  return /*#__PURE__*/React.createElement(Map, {
    zoom: 10,
    bounds: bounds,
    className: classes.root,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    keyboard: false,
    touchZoom: false
  }, /*#__PURE__*/React.createElement(ImageOverlay, {
    url: layers,
    bounds: bounds,
    opacity: 0.5
  }), /*#__PURE__*/React.createElement(TileLayer, {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
  }));
};

const useStyles$2 = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    variant: 'contained',
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    ariaLabel: "forward"
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}));
const ForwardButton = ({
  action
}) => {
  const classes = useStyles$2();
  return /*#__PURE__*/React.createElement(Button$1, {
    onClick: action,
    className: classes.root
  }, /*#__PURE__*/React.createElement(NavigateNextIcon, {
    className: classes.icon
  }));
};

const useStyles$3 = makeStyles(theme => ({
  root: {
    margin: 0,
    boxShadow: theme.shadows[3]
  },
  defaultButton: {
    backgroundColor: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  selectedButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 800,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText
    }
  }
}));
const GroupedButtons = ({
  options: _options = ['1', '2', '3'],
  action
}) => {
  const classes = useStyles$3();
  const [selected, setSelected] = useState(_options[0]);

  const handleClick = option => {
    setSelected(option);
    action(option);
  };

  return /*#__PURE__*/React.createElement(ButtonGroup, {
    className: classes.root
  }, _options.map(option => /*#__PURE__*/React.createElement(Button$1, {
    key: option,
    name: "group-button",
    onClick: () => handleClick(option),
    className: selected === option ? classes.selectedButton : classes.defaultButton
  }, option)));
};

const ModelSelector = ({
  options,
  label: _label = 'Model',
  action
}) => {
  const handleClick = index => {
    console.log(`clicked ${index}`);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label)), /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

const useStyles$4 = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 300
  },
  category: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: theme.palette.secondary.contrastText
  },
  icon: {},
  selectedIcon: {
    color: theme.palette.secondary.dark
  }
}));
const emptyMenu = [{
  name: 'Menu',
  open: true,
  products: [{
    name: 'A'
  }, {
    name: 'B'
  }]
}];
const ProductMenu = ({
  options: _options = emptyMenu,
  action
}) => {
  const classes = useStyles$4();
  const [selectedProduct, setSelectedProduct] = React.useState(`${_options[0].name} ${_options[0].products[0].name}`);
  const [categories, setCategories] = React.useState(_options || []);

  const handleClick = cat => {
    const newCategories = categories.map(item => {
      if (item !== cat) {
        return item;
      }

      return { ...item,
        open: !cat.open
      };
    });
    setCategories(newCategories);
  };

  const handleListItemClick = (event, product) => {
    setSelectedProduct(product.level + ' ' + product.product);
    action(product);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, categories.map((cat, index) => /*#__PURE__*/React.createElement(List, {
    key: index
  }, /*#__PURE__*/React.createElement(Paper, {
    className: classes.category
  }, /*#__PURE__*/React.createElement(ListItem, {
    button: true,
    onClick: () => handleClick(cat)
  }, /*#__PURE__*/React.createElement(ListItemText, {
    primary: /*#__PURE__*/React.createElement(Box, {
      m: 1
    }, /*#__PURE__*/React.createElement(Typography, {
      style: {
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: 1
      }
    }, cat.name))
  }), cat.open ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null))), /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Collapse, {
    in: cat.open,
    timeout: "auto",
    unmountOnExit: true
  }, cat.products.map((product, index) => /*#__PURE__*/React.createElement(ListItem, {
    key: index,
    button: true,
    className: classes.nested,
    selected: selectedProduct === cat.name + ' ' + product.name,
    onClick: event => handleListItemClick(event, {
      level: cat.name,
      product: product.name
    })
  }, product.icon != undefined && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    className: selectedProduct === cat.name + ' ' + product.name ? classes.selectedIcon : classes.icon,
    icon: product.icon
  })), /*#__PURE__*/React.createElement(ListItemText, {
    primary: product.name
  }))))))));
};

const ProductSelector = ({
  categories,
  label: _label = 'Products',
  action
}) => {
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, _label)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ProductMenu, {
    options: categories,
    action: action
  })));
};

const RegionSelector = ({
  options,
  label: _label = 'Region'
}) => {
  const handleClick = index => {
    console.log(`clicked ${index}`);
  };

  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      item: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label)), /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(GroupedButtons, {
      options: options,
      action: handleClick
    })))
  );
};

const toDates = options => {
  const dates = [];
  options.map(option => {
    const epoch = option * 1000;
    const date = new Date(epoch);
    const time = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}T ${date.getUTCHours()}:${date.getUTCMinutes()}Z`;
    dates.push(time);
  });
  return dates;
};

const RunsSelector = ({
  options,
  label: _label = 'Runs'
}) => {
  const handleClick = index => {
    console.log(`clicked ${index}`);
  };

  const dates = toDates(options);
  return (
    /*#__PURE__*/
    React.createElement(Grid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h6"
    }, _label)), /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(GroupedButtons, {
      options: dates,
      action: handleClick
    })))
  );
};

const RunDropdown = ({
  options,
  label: _label = 'Model Run'
}) => {
  const handleClick = index => {
    console.log(`clicked ${index}`);
  };

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, _label)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(RunsSelector, {
    options: options,
    action: handleClick
  })));
};

const useStyles$5 = makeStyles$1(theme => ({
  root: {
    color: theme.palette.primary.dark,
    height: 20
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.primary.contrastText,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  rail: {
    height: 5,
    borderRadius: 4
  },
  markLabelActive: {
    fontWeight: 700,
    padding: 12
  },
  markLabel: {
    fontWeight: 500,
    padding: 12
  },
  mark: {
    backgroundColor: theme.palette.primary.dark,
    height: 5
  }
}));

function ValueLabelComponent(props) {
  const {
    children,
    open,
    value
  } = props;
  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    placement: "top",
    title: value + ' + Model Run'
  }, children));
}

const compare = (a, b) => {
  const valA = Number(a.value);
  const valB = Number(b.value);
  let comparison = 0;

  if (valA > valB) {
    comparison = 1;
  } else if (valA < valB) {
    comparison = -1;
  }

  return comparison;
};

const toHour = options => {
  options.map(option => {
    option.label /= 360;
  });
};

const DiscreteSlider = Props => {
  const classes = useStyles$5();
  const {
    options
  } = Props;
  options.sort(compare);
  toHour(options);
  const stepValue = Number(options[1].value) - Number(options[0].value);
  const defaultValue = Number(options[0].value);
  const maxValue = Number(options[options.length - 1].value);
  console.log(stepValue);

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Slider, {
    classes: classes,
    valueLabelDisplay: "auto",
    "aria-label": "pretty slider",
    track: false,
    step: stepValue,
    marks: options,
    defaultValue: defaultValue,
    max: maxValue,
    ValueLabelComponent: ValueLabelComponent
  }));
};

const useStyles$6 = makeStyles(theme => ({
  play: {
    label: 'play',
    boxShadow: theme.shadows[3],
    background: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark
    }
  },
  pause: {
    label: 'pause',
    boxShadow: theme.shadows[3],
    background: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark
    }
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}));
const StartStopButton = ({
  onStart,
  onStop
}) => {
  const classes = useStyles$6();
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (playing) {
      setPlaying(false);
      onStart();
    } else {
      setPlaying(true);
      onStop();
    }
  };

  return playing ? /*#__PURE__*/React.createElement(Fab, {
    onClick: handleClick,
    className: classes.pause
  }, /*#__PURE__*/React.createElement(PauseIcon, {
    className: classes.icon
  })) : /*#__PURE__*/React.createElement(Fab, {
    onClick: handleClick,
    className: classes.play
  }, /*#__PURE__*/React.createElement(PlayArrowIcon, {
    className: classes.icon
  }));
};

const TimeControl = ({
  onBack,
  onNext,
  onPlay,
  onPause
}) => {
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(BackButton, {
    action: onBack
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(StartStopButton, {
    onStart: onPlay,
    onStop: onPause
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ForwardButton, {
    action: onNext
  })));
};

var theme = createMuiTheme({
  palette: {
    primary: {
      light: '#72c3fc',
      main: '#329af0',
      dark: '#1c7cd6',
      contrastText: '#f8f9fa'
    },
    secondary: {
      light: '#e9ecef',
      main: '#ff922b',
      dark: '#868e96',
      contrastText: '#474545'
    }
  },
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: '#E9ECEF',
          '&:hover': {
            backgroundColor: '#E9ECEF'
          },
          color: '#868e96'
        },
        paddingTop: '6px',
        paddingBottom: '6px'
      },
      gutters: {
        paddingLeft: '6px',
        paddingRight: '6px'
      }
    },
    MuiListItemIcon: {
      root: {
        color: '#000000'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#329af0',
        color: '#f8f9fa',
        fontSize: 16
      }
    }
  },
  spacing: 8
});

const ShyftContext = React.createContext({});
const ShyftWx = ({
  children,
  dataset,
  url,
  customer,
  themeOverride
}) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = React.useState({
    datasets: []
  });
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [selectedForecast, setSelectedForecast] = React.useState('');
  const customerUrl = `${url}/${customer}/${dataset}`;

  const loadAsync = async () => {
    const indexData = await getIndexAsync(customerUrl);

    if (!indexData || indexData.datasets.length === 0) {
      setError('No datasets available.');
      return;
    }

    for (let i = 0; i < indexData.datasets.length; i++) {
      const dataset = indexData.datasets[i];
      const datasetRegionRun = {
        dataset: dataset.name,
        region: dataset.region,
        run: {
          name: dataset.run,
          levels: []
        }
      };
      const runRegion = `${dataset.run}-${dataset.region.name}`;
      const datasetUrl = `${customerUrl}/${runRegion}`;
      const runRegionData = await getIndexAsync(datasetUrl);
      const items = runRegionData.items;
      let uniqueLevels = [];
      uniqueLevels = items.map(i => i.level).filter((v, i, a) => a.indexOf(v) === i).map(l => {
        return {
          name: l,
          products: []
        };
      });
      uniqueLevels.forEach(lvl => {
        lvl.products = items.filter(item => item.level === lvl.name).map(i => i.product).filter((v, i, a) => a.indexOf(v) === i).map(product => {
          return {
            name: product,
            forecasts: []
          };
        });
      });
      uniqueLevels.forEach(lvl => {
        lvl.products.forEach(product => {
          product.forecasts = items.filter(item => item.level === lvl.name && item.product == product.name).map(item => {
            return {
              hour: item.forecast,
              image: item.filename
            };
          });
        });
      });
      datasetRegionRun.run.levels = uniqueLevels;
      const indexes = {
        datasets: [datasetRegionRun]
      };
      setIndex(indexes);

      if (i === 0) {
        setSelectedLevel(indexes.datasets[0].run.levels[0].name);
        setSelectedProduct(indexes.datasets[0].run.levels[0].products[0].name);
        setSelectedForecast(indexes.datasets[0].run.levels[0].products[0].forecasts[0].hour);
      }
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (!url) {
      setError('No indexUrl or indexData provided.');
      return;
    }

    setLoading(true);
    loadAsync();
  }, []);

  const getSelectedLevel = () => {
    return index.datasets[0].run.levels.filter(lvl => lvl.name == selectedLevel)[0];
  };

  const getSelectedProduct = () => {
    return getSelectedLevel().products.filter(p => p.name == selectedProduct)[0];
  };

  const onProductSelect = product => {
    setSelectedLevel(product.level);
    setSelectedProduct(product.product);
    setSelectedForecast(getSelectedProduct().forecasts[0].hour);
  };

  const onSliderNavigationNext = () => {
    const forecasts = getSelectedProduct().forecasts;
    let forecastIndex = forecasts.findIndex(f => f.hour === selectedForecast);

    if (forecastIndex + 1 == forecasts.length) {
      return;
    }

    setSelectedForecast(forecasts[forecastIndex + 1].hour);
  };

  const onSliderNavigationBack = () => {
    const forecasts = getSelectedProduct().forecasts;
    const forecastIndex = forecasts.findIndex(f => f.hour === selectedForecast);

    if (forecastIndex - 1 < 0) {
      return;
    }

    setSelectedForecast(forecasts[forecastIndex - 1].hour);
  };

  const getOffset = () => {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    });
  };

  const generateContent = () => {
    if (error) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, error);
    }

    if (loading) {
      return /*#__PURE__*/React.createElement(CircularProgress, null);
    }

    const selectedProduct = getSelectedProduct();
    const levelProductVals = index.datasets[0].run.levels.map((lvl, index) => {
      return {
        name: lvl.name,
        open: index == 0,
        products: lvl.products
      };
    });
    const sliderVals = selectedProduct.forecasts.map(f => {
      return {
        label: f.hour,
        value: f.hour
      };
    });
    const activeForecastLayer = selectedProduct.forecasts.filter(f => f.hour === selectedForecast)[0].image;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, getOffset(), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(ModelSelector, {
      options: [index.datasets[0].dataset],
      action: () => {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(RegionSelector, {
      options: [index.datasets[0].region.name],
      action: () => {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(RunsSelector, {
      options: [index.datasets[0].run.name],
      action: () => {}
    })))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 3
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true
    }, /*#__PURE__*/React.createElement(ProductSelector, {
      categories: levelProductVals,
      action: onProductSelect
    }))), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      xs: 9
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(BaseWxViewer, {
      layers: activeForecastLayer,
      neBounds: [index.datasets[0].region.bbox.ymax, index.datasets[0].region.bbox.xmax],
      swBounds: [index.datasets[0].region.bbox.ymin, index.datasets[0].region.bbox.xmin]
    })), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 12
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      item: true,
      xs: 2
    }, /*#__PURE__*/React.createElement(TimeControl, {
      onBack: onSliderNavigationBack,
      onNext: onSliderNavigationNext,
      onPlay: () => {},
      onPause: () => {}
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 1
    }), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 9
    }, /*#__PURE__*/React.createElement(DiscreteSlider, {
      options: sliderVals
    })))));
  };

  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: themeOverride || theme
  }, /*#__PURE__*/React.createElement(ShyftContext.Provider, {
    value: {
      data: index
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-start",
    spacing: 3
  }, generateContent())));
};

export { BackButton, BaseWxViewer, ForwardButton, GroupedButtons, ModelSelector, ProductMenu, ProductSelector, RegionSelector, RunDropdown, ShyftWx, RunsSelector as SimpleSelect, DiscreteSlider as Slider, StartStopButton, TimeControl, index as apis, theme };
//# sourceMappingURL=index.modern.js.map
