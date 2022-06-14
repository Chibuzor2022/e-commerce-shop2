import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
    marginBottom: '5%'
  },
  emptyButton: {
    minWidth: '110px',
    marginTop: '10px',
    maxHeight: '50px'
  
   
  },
  checkoutButton: {
    minWidth: '110px',
    margin: '10px',
    padding: '20px 0',
    maxHeight: '50px'
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));