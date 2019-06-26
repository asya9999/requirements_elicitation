import React from "react";
import { render } from "react-dom";

const Article = ({ title, text }) => (
  <div>
    <h3>{title || "Без заголовка"}</h3>
    <p>{text || "пусто"}</p>
  </div>
);

class Add extends React.Component {
  static emptyArticle = {
    title: "",
    text: ""
  };

  constructor() {
    super();
    this.state = {
      articles: [
        {title: "Hi"},
        {title: "Ho"},
      ],
      newArticle: { ...Add.emptyArticle }
    };
  }

  handleCreateArticle = e => {
    e.preventDefault();
    const { articles, newArticle } = this.state;

    this.setState({
      newArticle: { ...Add.emptyArticle },
      articles: [
        ...articles,
        {
          ...newArticle,
          id: Math.random()
        }
      ]
    });
  };


  handleChangeNewArticle = name => ({ target }) => {
    const { newArticle } = this.state;
    this.setState({
      ...this.state,
      newArticle: {
        ...newArticle,
        [name]: target.value
      }
    });
  };

  render() {
    const { articles, newArticle } = this.state;

    return (
      <div>
        <form onSubmit={this.handleCreateArticle}>
          <input
            placeholder="Заголовок"
            onChange={this.handleChangeNewArticle("title")}
            value={newArticle.title}
          />
          <br />
          <br />
          <input
            placeholder="Текст"
            onChange={this.handleChangeNewArticle("text")}
            value={newArticle.text}
          />
          <br />
          <br />
          <input type="submit" value="Создать" />
        </form>
        <br />
        <br />
        {articles.map(article => <Article key={article.id} {...article} />)}
      </div>
    );
  }
}

export default Add;