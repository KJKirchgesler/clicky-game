import React, { Component } from "react";
import LeaderCard from "./components/LeaderCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./components/Grid/Container";
import Row from "./components/Grid/Row";
import Column from "./components/Grid/Column";
import leaders from "./leaders.json";
import "./App.css";

//sets up the array of world leader images
function shuffleLeaders(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    leaders,
    currentScore: 0,
    topScore: 0,
    playerFeedback: "",
    clicked: [],
  };

  //Sets the conditions of what to do when the player clicks an image
  clickImage = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.incrementScore();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.resetGame();
    }
  };

  incrementScore = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      playerFeedback: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ playerFeedback: "You win!" });
    }
    this.shuffleImages();
  };

  resetGame = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      playerFeedback: "You've been ousted!",
      clicked: []
    });
    this.shuffleImages();
  };

  shuffleImages = () => {
    let shuffledLeaders = shuffleLeaders(leaders);
    this.setState({ leaders: shuffledLeaders });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="World Leaders Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          playerFeedback={this.state.playerFeedback}
        />

        <Title>
          Try to click on each leader, but not more than once. Otherwise,
          we'll vote you out or worse!
        </Title>

        <Container>
          <Row>
            {this.state.leaders.map(leader => (
              <Column size="md-3 sm-6">
                <LeaderCard
                  key={leader.id}
                  clickImage={this.clickImage}
                  incrementScore={this.incrementScore}
                  resetGame={this.resetGame}
                  shuffleImages={this.shuffleImages}
                  id={leader.id}
                  image={leader.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;