import * as React from 'react';
import ReactDOM from 'react-dom';

class ShoppingList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        query: '',
        products: [],
        showStocked : true
      };

    }

    componentDidMount() {
      var self = this;
      fetch("https://api.myjson.com/bins/109M7I")
        .then(res => res.json())
        .then(
          (result) => {    

            var categoryType = []
            result.forEach(obj => {
              if(categoryType.indexOf(obj.category) == -1){
                categoryType.push(obj.category)
              }
            })
            var products = []
            categoryType.forEach(type => {
              var filteredArray = result.filter(obj => {                
                return obj.category === type
              })
              products.push({category : type, products: new Object(filteredArray) })
            })
            console.log(products)
            



            this.setState({
              products: products
            });
            //this.getCategories(result)

          },
          (error) => {
          }
        )
    }

    onProductSearch(event) {      
      this.setState({query: event.target.value});      
    }

    onChangeStock(event){
      this.setState({showStocked: !event.currentTarget.checked}); 
    }

    render() {
      const { query, products, showStocked } = this.state;
      var regex = new RegExp("(\\b" + query + "[a-zA-Z0-9]*\\b)", "gim");
      return (
        
        <div className="shopping-list container d-flex justify-content-center">
          <div className="col-4">         
          
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Search</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search Products" value={this.state.value} onChange={this.onProductSearch.bind(this)}/>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.onChangeStock.bind(this)} />
            <label className="form-check-label" htmlFor="exampleCheck1">Only show product in stock</label>
          </div>

          

            {products && products.map(item => (
              <div key={item}>
              <h6>{item.category}</h6>
              <ul>
                {item.products && item.products.map(product => {                  
                  if(product.name.match(regex) ){
                    return <li key={product.name} className={(product.stocked ? "" : ( showStocked ? "text-danger": "text-danger d-none")) }>
                      {product.name} - {product.price} 
                    </li>
                  }                  
                })}
              </ul>
              </div>
            ))}                         
          </div>
        </div>
      );
      
    }
  }

  export default ShoppingList;