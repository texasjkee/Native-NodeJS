import React from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const GoodsItem = (props) => {
    const { name, price, setOrder, poster } = props;

    return (
        <Grid item xs={12} md={4}>
            <Card>
                <CardMedia
                    image={poster}
                    component='img'
                    alt={name}
                    title={name}
                    sx={{ height: 140 }}
                />
                <CardContent>
                    <Typography
                        variant='h6'
                        component='h3'
                    >
                        {name}
                    </Typography>
                    <Typography variant='body1'>Цена: {price} UAH.</Typography>
                </CardContent>
                <CardActions >
                    <Button
                        // variant='contained'
                        className='btn btn-primary'
                        onClick={() =>
                            setOrder({
                                id: props.id,
                                name: props.name,
                                price: props.price,
                            })
                        }
                    >
                        Купить
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GoodsItem;