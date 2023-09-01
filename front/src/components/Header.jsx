import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant='h6'
            component='span'
            sx={{ flexGrow: 1 }}
          >
            <h2>MUI shop</h2>
          </Typography>
          <IconButton
            color='inherit'
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;