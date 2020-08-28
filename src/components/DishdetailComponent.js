import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


    

    function RenderDish({dish}){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}){
        const com=comments.map((comment) => {
            return(
                <div>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date (Date.parse(comment.date)))}</li>
                    </ul>
                    
                </div>
                    
            );
        });

        return (
            <div>
                {com}
                <CommentForm />
            </div>
            
        );
    }

    const DishDetail = (props) => {
        var dish=props.dish;
        if (dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />        
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        
                            <h4>Comments</h4>
                        
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
                
                
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
    }

    const max=(len) => (val) => !(val) || (val.length<=len);
    const min=(len) => (val) => val && (val.length>=len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);
            this.state={
                isComOpen: false
            };
            this.toggleCom = this.toggleCom.bind(this);
            this.handleComment=this.handleComment.bind(this);
        }

        handleComment(event){
            this.toggleCom();
        }

        toggleCom(){
            this.setState({
                isComOpen: !this.state.isComOpen
            });
        }
        render(){
            return(
                <div>
                    <Modal isOpen={this.state.isComOpen} toggle={this.toggleCom}>
                        <ModalHeader toggle={this.toggleCom}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12">
                                <LocalForm onSubmit={this.handleComment}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>

                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="yourname">Your Name</Label>
                                        <Control.text model=".yourname" id="yourname" name="yourname" className="form-control" validators={{min:min(3), max:max(15)}} />
                                        <Errors className="text-danger" model=".yourname" show="touched" messages={{min: 'Must be greater than 2 characters', max: 'Must be 15 characters or less'}} />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment" row="6" className="form-control" />
                                    </Row>
                                    
                                </LocalForm>
                                
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </ModalBody>
                    </Modal>
                    <Button outline onClick={this.toggleCom}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                </div>
            )
        }
    }


export default DishDetail;