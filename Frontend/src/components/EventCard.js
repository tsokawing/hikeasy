import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./EventCard.css";

class EventCard extends Component {
  constructor() {
    super();
    this.state = {
      photoName: [],
    };
  }

  componentDidMount() {
    // eventID -> eventPhotoName -> event photo (actual file)

    console.log(this.props.event);
    // console.log(this.props.event.id);

    fetch(
      "http://18.188.120.239:8080/events/get_photo/".concat(this.props.event.id)
    )
      .then((response) => response.json())
      .then((result) => {
        // fetched file name of the photo of this event, contained inside result
        console.log(result);
        const fileNameOfThisPhoto =
          result.photoFileNames[0]?.fileName ?? undefined;
        console.log(fileNameOfThisPhoto);
        // this set state
        this.setState({ photoName: fileNameOfThisPhoto }, () => {
          // console.log(this.state.photoName);
        });
      });
  }

  render() {
    console.log(this.state.photoName);
    let imgSource = this.state.photoName
      ? "http://18.188.120.239:8080/image/".concat(this.state.photoName)
      : // ? "http://localhost:8080/image/".concat(this.state.photoName)
        "https://picsum.photos/200/300";

    console.log(imgSource);

    return (
      <div className="card-container">
        <Card className="root">
          <CardActionArea>
            <CardMedia
              className="media"
              image={imgSource}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default EventCard;
