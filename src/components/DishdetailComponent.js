import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import {Loading} from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

    

    function RenderDish({dish}){
        return(
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg top src={baseUrl+dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            
        );
    }

    function RenderComments({comments, postComment, dishId}){
        const com=comments.map((comment) => {
            return(
                <Fade in>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date (Date.parse(comment.date)))}</li>
                    </ul>
                    
                </Fade>
                    
            );
        });

        return (
            <div>
                <Stagger in>
                    {com}
                </Stagger>
                
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
            
        );
    }

    const DishDetail = (props) => {
        var dish=props.dish;
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish!=null){
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
                        
                            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
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

        handleComment(values){
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                                <LocalForm onSubmit={(values)=>this.handleComment(values)}>
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
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author" className="form-control" validators={{min:min(3), max:max(15)}} />
                                        <Errors className="text-danger" model=".author" show="touched" messages={{min: 'Must be greater than 2 characters', max: 'Must be 15 characters or less'}} />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment" row="6" className="form-control" />
                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                                
                            </div>
                            
                        </ModalBody>
                    </Modal>
                    <Button outline onClick={this.toggleCom}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                </div>
            )
        }
    }


export default DishDetail;