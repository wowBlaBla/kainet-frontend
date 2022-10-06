import { Box, Chip, Container, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { Link, useParams } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
//** */
import {
    gainerfetchPriceVariation,
    gainerfetchTopTradePairs,
    gainergetldforpairs,
    gainergetLikeStatusByAccount,
    gainerupdatePairAction,
  } from "../../allfunction/gainerFetchFunctions";
  import {
    loserfetchPriceVariation,
    loserfetchTopTradePairs,
    losergetldforpairs,
    losergetLikeStatusByAccount,
    loserupdatePairAction,
  } from "../../allfunction/loserFetchFunctions";
 //** */ 
 import AdjustIcon from "@mui/icons-material/Adjust";
 import { Avatar, Badge } from "@material-ui/core";
 import { useAccount, useSignMessage } from "wagmi";
// icons share
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from 'styled-components';
import { getContainerUtilityClass } from '@mui/system';

const Dadhboardtext = styled.h4`
    color: ${({ theme }) => theme.text};
`

const iconsshare = [
    {
        tools: 'Web',
        icon: <DesktopWindowsIcon sx={{ color: '#ddd', marginRight: '6px', cursor: 'pointer', fontSize: '18px' }} />,
    },
    {
        tools: 'Mail',
        icon: <MailOutlineIcon sx={{ color: '#ddd', marginRight: '6px', cursor: 'pointer', fontSize: '18px' }} />,
    },
    {
        tools: 'Telegram',
        icon: <TelegramIcon sx={{ color: '#ddd', marginRight: '6px', cursor: 'pointer', fontSize: '18px' }} />,
    },
    {
        tools: 'Twitter',
        icon: <TwitterIcon sx={{ color: '#ddd', marginRight: '6px', cursor: 'pointer', fontSize: '18px' }} />,
    },
]
//** */
function createData(name, price, variation) {
  //if(variation.isPositive !== -1)
  
    return {
      name: (
        <Box display="flex" alignItems="center">
          <Box marginRight="8px" display="flex" alignItems="center">
            <Avatar
              alt="C"
              width="20px"
              height="20px"
              style={{ borderRadius: "50px", objectFit: "cover" }}
            >
              <AdjustIcon color="inherit" fontSize="small" />
            </Avatar>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" color="#fff" fontSize="14px">
              <Typography variant="body">{name[0]}</Typography>
              <Typography style={{ margin: "0 3px" }} color="#48f00b">
                /
              </Typography>
              <Typography variant="body">{name[1]}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Link to="/">
                <Typography
                  variant="body"
                  fontSize="13px"
                  color="#f0b90b"
                  className="addreswidth"
                >
                  {name[2]} &nbsp;
                </Typography>
              </Link>
              <ContentCopyIcon sx={{ fontSize: "14px", marginLeft: "5px" }} />
            </Box>
          </Box>
        </Box>
      ),
      price: (
        <Box color="#fff" fontSize="14px">
          <Typography variant="body">${parseFloat(price).toFixed(6)}</Typography>
        </Box>
      ),
      variation: (
        <Box
          color={variation && variation.isPositive !== -1 ? "#48f00b" : "red"}
          fontSize="14px"
        >
          <Typography variant="body">
          
            {variation ? `${variation.value}%` : "-Not Available-"}
          </Typography>
        </Box>
      ),
    };
  }

  function losercreateData(name, price, variation) {
    return {
      name: (
        <Box display="flex" alignItems="center">
          <Box marginRight="8px" display="flex" alignItems="center">
            <Avatar
              alt="C"
              width="20px"
              height="20px"
              style={{ borderRadius: "50px", objectFit: "cover" }}
            >
              <AdjustIcon color="inherit" fontSize="small" />
            </Avatar>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" color="#fff" fontSize="14px">
              <Typography variant="body">{name[0]}</Typography>
              <Typography style={{ margin: "0 3px" }} color="#48f00b">
                /
              </Typography>
              <Typography variant="body">{name[1]}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Link to="/">
                <Typography
                  variant="body"
                  fontSize="13px"
                  color="#f0b90b"
                  className="addreswidth"
                >
                  {name[2]} &nbsp;
                </Typography>
              </Link>
              <ContentCopyIcon sx={{ fontSize: "14px", marginLeft: "5px" }} />
            </Box>
          </Box>
        </Box>
      ),
      price: (
        <Box color="#fff" fontSize="14px">
          <Typography variant="body">${parseFloat(price).toFixed(6)}</Typography>
        </Box>
      ),
      variation: (
        <Box
          color={variation && variation.isPositive !== -1 ? "#48f00b" : "red"}
          fontSize="14px"
        >
          <Typography variant="body">
            {variation ? `${variation.value}%` : "-Not Available-"}
          </Typography>
        </Box>
      ),
    };
  }
  
//** */

//** */ 
const Biggest = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [loserrows, losersetRows] = React.useState([]);
    const { chain } = useParams();
    const { address } = useAccount();
    const [likeStatus, setLikeStatus] = React.useState({});
  
    const { signMessage } = useSignMessage({
      onSuccess: async (data, variables) => {
        const result = await gainerupdatePairAction(variables.message, data);
        await gainergetLikeStatusByAccount(address).then(result => setLikeStatus(result));
      },
    });
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    React.useEffect(() => {
      gainergetLikeStatusByAccount(address)
      .then(result => {
        setLikeStatus(result);
      })
    }, [address])
    
    React.useEffect(() => {
      losergetLikeStatusByAccount(address)
      .then(result => {
        setLikeStatus(result);
      })
    }, [address])
  
    React.useEffect(() => {
      async function fetchIt() {
        const data = await gainerfetchTopTradePairs(chain);
        const variationArgs = [];
        data.forEach((value, index) => {
          if (index % 2 === 0) {
            variationArgs.push({
              baseCurrency: value.baseCurrency.address,
              quoteCurrency: data[index + 1].baseCurrency.address,
            });
          }
        });
  
        const pairArgs = [...new Set(data.map(value => value.token.address.address))];
        const pairFetchResult = await gainergetldforpairs(pairArgs);
        const pairResult = {};
        if(pairFetchResult && pairFetchResult.code){
          pairFetchResult.data.forEach(value => {
            const liked = value.likeStatus[0] && value.likeStatus[0].likedStatus? value.likeStatus[0].count: value.likeStatus[1] && value.likeStatus[1].likedStatus? value.likeStatus[1].count: 0;
            const disliked = value.likeStatus[0] && !value.likeStatus[0].likedStatus? value.likeStatus[0].count: value.likeStatus[1] && !value.likeStatus[1].likedStatus? value.likeStatus[1].count: 0;
            pairResult[value["_id"]] = {liked, disliked };
          })
        }
  
        const variation = await gainerfetchPriceVariation(chain, variationArgs);
        //const variation = await gainers(chain, variationArgs);
        if (data) { console.log(variation, "getpricevariation")
          const newRow = [];
          data.forEach((value, index) => {
            if (index % 2 === 0) {
              let exchangeName = value.exchange.fullName;
              let variationData =
                variation.data.data.ethereum[`variation${index / 2}`];
              let variations = null;
              if (variationData && variationData[0] && variationData[1]) {
                const diff =
                  variationData[1].quotePrice - variationData[0].quotePrice;
                variations = {};
                variations.isPositive = Math.sign(diff);
                variations.value = parseFloat(
                  (Math.abs(diff) / variationData[0].quotePrice) * 100
                ).toFixed(2);
              }
  
              if (exchangeName[0] === "<") {
                exchangeName = exchangeName.slice(1).slice(0, -1);
              }
              if(variationData && variationData[0] && variationData[1] && Math.sign(variationData[1].quotePrice - variationData[0].quotePrice) !==-1)
              // console.log(variations.isPositive,"vaiation ispositive")
              newRow.push(
                createData(
                  [
                    value.baseCurrency.symbol,
                    data[index + 1].baseCurrency.symbol,
                    value.token.address.address,
                  ],
                  value.any,
                  variations,
                )
              );
            }
          });
          setRows(newRow);
        } else {
          setRows([]);
        }
      }
      fetchIt();
    }, [chain, signMessage, likeStatus]);
    React.useEffect(() => {
      async function fetchIt() {
        const data = await loserfetchTopTradePairs(chain);
        const variationArgs = [];
        data.forEach((value, index) => {
          if (index % 2 === 0) {
            variationArgs.push({
              baseCurrency: value.baseCurrency.address,
              quoteCurrency: data[index + 1].baseCurrency.address,
            });
          }
        });
  
        const pairArgs = [...new Set(data.map(value => value.token.address.address))];
        const pairFetchResult = await losergetldforpairs(pairArgs);
        const pairResult = {};
        if(pairFetchResult && pairFetchResult.code){
          pairFetchResult.data.forEach(value => {
            const liked = value.likeStatus[0] && value.likeStatus[0].likedStatus? value.likeStatus[0].count: value.likeStatus[1] && value.likeStatus[1].likedStatus? value.likeStatus[1].count: 0;
            const disliked = value.likeStatus[0] && !value.likeStatus[0].likedStatus? value.likeStatus[0].count: value.likeStatus[1] && !value.likeStatus[1].likedStatus? value.likeStatus[1].count: 0;
            pairResult[value["_id"]] = {liked, disliked };
          })
        }
  
        const variation = await loserfetchPriceVariation(chain, variationArgs);
        //const variation = await gainers(chain, variationArgs);
        if (data) { 
          const newRow = [];
          data.forEach((value, index) => {
            if (index % 2 === 0) {
              let exchangeName = value.exchange.fullName;
              let variationData =
                variation.data.data.ethereum[`variation${index / 2}`];
              let variations = null;
              if (variationData && variationData[0] && variationData[1]) {
                const diff =
                  variationData[1].quotePrice - variationData[0].quotePrice;
                variations = {};
                variations.isPositive = Math.sign(diff);
                variations.value = parseFloat(
                  (Math.abs(diff) / variationData[1].quotePrice) * 100
                ).toFixed(2);
              }
  
              if (exchangeName[0] === "<") {
                exchangeName = exchangeName.slice(1).slice(0, -1);
              }
              if(variationData && variationData[0] && variationData[1] && Math.sign(variationData[1].quotePrice - variationData[0].quotePrice) ===-1)
              newRow.push(
                losercreateData(
                  [
                    value.baseCurrency.symbol,
                    data[index + 1].baseCurrency.symbol,
                    value.token.address.address,
                  ],
                  value.any,
                  variations,
                )
              );
            }
          });
          losersetRows(newRow);
        } else {
          losersetRows([]);
        }
      }
      fetchIt();
    }, [chain, signMessage, likeStatus]);
  //   function applySorting(key, ascending) {
  //     setSorting({ key: row.variation, ascending: ascending });
  // }
    return (
        <div>
            <Container maxWidth='xl'>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <Dadhboardtext>
                            <Typography variant='h4' gutterBottom component='div' >
                                Dashboard
                            </Typography>
                        </Dadhboardtext>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <Box classes='biggbox' bgcolor='#17293d' borderRadius='12px' padding='1.5rem' height='auto'>
                            <Box>
                                <Box display='flex' alignItems='center'>
                                    <ShowChartOutlinedIcon sx={{ color: '#fff', marginRight: '6px' }} />
                                    <Typography variant='h5' color='#fff' component='div'>
                                        Biggest gainers
                                    </Typography>
                                    <Typography variant='h7' color='#fff' style={{marginLeft:'180px'}}>
                                        <a class="ng-tns-c133-2" href="../gainers/ethereum"> More>> </a> 
                                    </Typography>
                                </Box>
                                <Box>
                                  

                                       {rows.map((row, index) => {
                                        return(
                                          
                                        <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='10px'>
                                            
                                                <Typography variant='body' color='#fff'>
                                                    {row.name}
                                                </Typography>
                                            
                                            
                                                <Typography variant='h6' color='#f0b90b' >
                                                    +
                                                </Typography>
                                            
                                            
                                                <Typography variant='body' color='#f0b90b'>
                                                    {row.price}
                                                </Typography>
                                                
                                           
                                           
                                            <Typography color='#48f00b' variant='body' style={{ marginLeft: '10px' }}>
                                                    
                                                   
                                                    {row.variation}
                                                
                                                  
                                                </Typography>
                                            
                                           
                                                <Tooltip title="Shaow Live Data" placement="top-start">
                                                    <WaterfallChartIcon sx={{ color: '#f0b90b', cursor: 'pointer', fontSize: '18px' }} />
                                                </Tooltip>
                                           
                                        </Box>
                                       
                                         );
                                         })}
                                    
                                    
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box classes='biggbox' bgcolor='#17293d' borderRadius='12px' padding='1.5rem' height='auto'>
                            <Box>
                                <Box display='flex' alignItems='center'>
                                    <ShowChartOutlinedIcon sx={{ color: '#fff', marginRight: '6px' }} />
                                    <Typography variant='h5' color='#fff' component='div'>
                                        Biggest Losers
                                    </Typography>
                                    <Typography variant='h7' color='#fff' style={{marginLeft:'200px'}}>
                                        <a class="ng-tns-c133-2" href="../losers/ethereum"> More>> </a> 
                                    </Typography>
                                </Box>
                                <Box>
                                  
                                       {loserrows.map((row, index) => {
                                        return(
                                        <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='10px'>
                                            
                                                <Typography variant='body' color='#fff'>
                                                    {row.name}
                                                </Typography>
                                            
                                            
                                                <Typography variant='h6' color='#f0b90b'>
                                                    -
                                                </Typography>
                                            
                                            
                                                <Typography variant='body' color='#f0b90b'>
                                                    {row.price}
                                                </Typography>
                                                
                                           
                                           
                                            <Typography color='#48f00b' variant='body' style={{ marginLeft: '10px' }}>
                                                    {row.variation}
                                                </Typography>
                                            
                                           
                                                <Tooltip title="Shaow Live Data" placement="top-start">
                                                    <WaterfallChartIcon sx={{ color: '#f0b90b', cursor: 'pointer', fontSize: '18px' }} />
                                                </Tooltip>
                                           
                                        </Box>
                                       
                                         );
                                         })}
                                    
                                    
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Box classes='biggbox' bgcolor='#17293d' borderRadius='12px' padding='1.5rem' height='auto'>
                            <Box>
                                <Box display='flex' alignItems='center'>
                                    <RotateLeftOutlinedIcon sx={{ color: '#fff', marginRight: '6px' }} />
                                    <Typography variant='h5' color='#fff' component='div'>
                                        Recently updated socials
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='10px'>
                                        <Box display='flex' alignItems='center' justifyContent='space-between' >
                                            <Box>
                                                <Typography variant='body' color='#fff'>
                                                    #1
                                                </Typography>
                                            </Box>
                                            <Box marginX='10px'>
                                                <Typography variant='h6' color='#f0b90b'>
                                                    +
                                                </Typography>
                                            </Box>
                                            <Box display='flex' alignItems='center' color='#fff' fontSize='13px'>
                                                <Typography variant='body'>
                                                    ETH
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography variant='body' color='#5d7188' fontSize='14px'>
                                                4 h 22 m 18 s ago
                                            </Typography>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                            <Box marginRight='10px'>
                                                {iconsshare.map((icons, index) => (
                                                    <Tooltip key={`${icons}${index}`} title={icons.tools} placement="top-start">
                                                        {icons.icon}
                                                    </Tooltip>
                                                ))}
                                            </Box>
                                            <Tooltip title="Shaow Live Data" placement="top-start">
                                                <WaterfallChartIcon sx={{ color: '#f0b90b', cursor: 'pointer', fontSize: '18px' }} />
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='10px'>
                                        <Box display='flex' alignItems='center' justifyContent='space-between' >
                                            <Box>
                                                <Typography variant='body' color='#fff'>
                                                    #2
                                                </Typography>
                                            </Box>
                                            <Box marginX='10px'>
                                                <Typography variant='h6' color='#f0b90b'>
                                                    +
                                                </Typography>
                                            </Box>
                                            <Box display='flex' alignItems='center' color='#fff' fontSize='13px'>
                                                <Typography variant='body'>
                                                    KCS
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography variant='body' color='#5d7188' fontSize='14px'>
                                                4 h 22 m 18 s ago
                                            </Typography>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                            <Box marginRight='10px'>
                                                {iconsshare.map((icons, index) => (
                                                    <Tooltip key={`${icons}${index}`} title={icons.tools} placement="top-start">
                                                        {icons.icon}
                                                    </Tooltip>
                                                ))}
                                            </Box>
                                            <Tooltip title="Shaow Live Data" placement="top-start">
                                                <WaterfallChartIcon sx={{ color: '#f0b90b', cursor: 'pointer', fontSize: '18px' }} />
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <Box display='flex' alignItems='center' justifyContent='space-between' marginTop='10px'>
                                        <Box display='flex' alignItems='center' justifyContent='space-between' >
                                            <Box>
                                                <Typography variant='body' color='#fff'>
                                                    #3
                                                </Typography>
                                            </Box>
                                            <Box marginX='10px'>
                                                <Typography variant='h6' color='#f0b90b'>
                                                    +
                                                </Typography>
                                            </Box>
                                            <Box display='flex' alignItems='center' color='#fff' fontSize='13px'>
                                                <Typography variant='body'>
                                                    ROSE
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography variant='body' color='#5d7188' fontSize='14px'>
                                                4 h 22 m 18 s ago
                                            </Typography>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                            <Box marginRight='10px'>
                                                {iconsshare.map((icons, index) => (
                                                    <Tooltip key={`${icons}${index}`} title={icons.tools} placement="top-start">
                                                        {icons.icon}
                                                    </Tooltip>
                                                ))}
                                            </Box>
                                            <Tooltip title="Shaow Live Data" placement="top-start">
                                                <WaterfallChartIcon sx={{ color: '#f0b90b', cursor: 'pointer', fontSize: '18px' }} />
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
  };
  
//** */


export default Biggest;