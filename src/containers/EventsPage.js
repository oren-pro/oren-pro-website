import React from 'react';
import {Helmet} from 'react-helmet';
import AutosizeInput from 'react-input-autosize';
import { Button, Popover, Tooltip, OverlayTrigger } from "react-bootstrap";
import Modal from 'react-responsive-modal';
import { Prompt } from "react-router";
import ContactStrip from '../components/contactpage/ContactStrip';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import EventsHeader from '../components/eventspage/EventsHeader';
import EventsTabs from '../components/eventspage/EventsTabs';
import EventsText from '../components/eventspage/EventsText';
import EventsEvents from '../components/eventspage/EventsEvents';
import Navigation from '../components/common/Navigation';
import PageUpStrip from '../components/common/PageUpStrip';
import SocialMedia from '../components/common/SocialMedia';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import {
    startAddCategory,
    startSetSubcategories,
    startAddSubcategory,
    startSetItems,
    startAddItem,
    startUpdateEventImage,
    setCategoryId,
    setSubcategoryId,
    startEditCategory,
    startEditSubCategories,
    startHookSubcategory,
    startHookEvent,
    startToggleShowSubcategory,
    startToggleShowEvent,
    startEditEvents,
    startSetAllSubcategories,
    startSetAllEvents,
    startEditSeo
} from '../actions/eventspage';
import $ from 'jquery';
import { iconRatioOn } from '../reusableFunctions/iconRatioOn';
import { iconRatioOut } from '../reusableFunctions/iconRatioOut';
import { handlePageScroll } from '../reusableFunctions/handlePageScroll';

class EventsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ratio: 1,
            ratioFacebook: 1,
            ratioInstagram: 1,
            ratioMail: 1,
            ratioPhone: 1,
            ratioGreenArrow: 1,
            categoryOrigin: {},
            category: {
                id: '',
                name: '',
                text: '',
                showLines: 6
            },
            allSubCategories: this.props.eventsObject.allSubCategories,
            subCategoriesOrigin: [],
            subCategories: [],
            subcategoryId: '',
            allEvents: this.props.eventsObject.allEvents,
            itemsOrigin: [],
            items: [],
            itemsCurrentOrigin: [],
            itemsCurrent: [],
            editCategoryModalIsOpen: false,
            newSubcategoryNameModalIsOpen: false,
            newSubcategoryName: '',
            newItemNameModalIsOpen: false,
            newItemName: '',
            hideSubcategoriesEditPanel: true,
            pageupImageClassName: 'pageup__image__absolute',
            seoModalIsOpen: false,
            seo: {
                title: '',
                description: '',
                keyWords: '',
            }
        }
    }

    setIconRatioOn = (e) => {
        this.setState(iconRatioOn(e));
    }

    setIconRatioOut = (e) => {
        this.setState(iconRatioOut(e));
    }

    uploadWidget = (e) => {
        const { dataset } = e.target;
        const { action, field, index, name } = dataset;
        var myUploadWidget = cloudinary.openUploadWidget({ 
            cloud_name: 'orenpro', 
            upload_preset: 'fbznsdxt', 
            // tags: ['test'],
            sources: [
                "local",
                "url",
                "image_search",
                "facebook",
                "dropbox",
                "instagram",
                "camera"
            ],
            //UI Customization
            // styles: {
            //     palette: {
            //         window: "#10173a",
            //         sourceBg: "#20304b",
            //         windowBorder: "#9999ff",
            //         tabIcon: "#33ffcc",
            //         inactiveTabIcon: "#0e2f5a",
            //         menuIcons: "#ffccff",
            //         link: "#ff0066",
            //         action: "#33ffcc",
            //         inProgress: "#00ffcc",
            //         complete: "#33ff00",
            //         error: "#cc3333",
            //         textDark: "#000000",
            //         textLight: "#ffffff"
            //     }
            // },
            fonts: {
                default: null,
                "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
                "'Gamja Flower', cursive": "https://fonts.googleapis.com/css?family=Gamja+Flower|PT+Serif"
            }
        },
            (error, result) => {
                if (error) {
                    console.log(error);
                }
                if (result.event === "success") {
                    const image = {
                        image: result.info.secure_url
                    };
                    this.props.startUpdateEventImage(index, image).then((items)=> {
                        console.log('done page');
                        this.setState({
                            items
                        });
                    });
                    myUploadWidget.close();
                }
            }
        );
        //myUploadWidget.open();
    }

    handleScroll = () => {
        this.setState(handlePageScroll(this.state.pageupImageClassName));
    }

    
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        let itemsCurrent = [];
        const nextCategory = this.props.eventsObject.categories[this.props.categoryIndex].id;
        const prevCategory = this.props.eventsObject.categoryId;
        if (nextCategory !== prevCategory) {
            //console.log('reset sub to all');
            this.props.setCategoryId(nextCategory);
            this.props.setSubcategoryId('');
        }
        if (!prevCategory) {
            //console.log('new cat');
            this.props.setCategoryId(nextCategory);
        }

        //if (!this.props.eventsObject.allSubCategories) {
            this.props.startSetAllSubcategories().then(() => {
                this.setState({
                    allSubCategories: JSON.parse(JSON.stringify(this.props.eventsObject.allSubCategories))
                });
                this.props.startSetAllEvents().then(() => {
                    //console.log(this.props.eventsObject.allEvents);
                    this.setState({
                        allEvents: JSON.parse(JSON.stringify(this.props.eventsObject.allEvents))
                    });
                });
            });
        //}
        const category = JSON.parse(JSON.stringify(this.props.eventsObject.categories[this.props.categoryIndex]))
        if (!category.seo) {
            category.seo = {
                title: '',
                description: '',
                keyWords: ''
            }
        }
        this.setState({
            category: category,
            categoryOrigin: JSON.parse(JSON.stringify(category)),
            seo: category.seo
        });

        let subcategoryId = '';
        if (this.props.eventsObject.subcategoryId) {
            subcategoryId = this.props.eventsObject.subcategoryId;
        } 
        this.setState({
            subcategoryId
        });
        const categoryId = this.props.category.id;
        if (!this.props.eventsObject[categoryId]) {
            this.props.startSetSubcategories(categoryId).then((subCategories)=> {
                subCategories.sort((a, b) => {
                    return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
                });
                this.setState({
                    subCategoriesOrigin: JSON.parse(JSON.stringify(subCategories)),
                    subCategories
                });
                
                
                this.props.eventsObject.categories.map((category, index) => {
                    if (category.id !== categoryId) {
                        this.props.startSetItems(category.id).then((items)=> {
                            //console.log('set '+category.id)
                        });
                    }
                });
                
                
                
                this.props.startSetItems(categoryId).then((items)=> {
                    items.sort((a, b) => {
                        return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
                    });
                    //console.log('in 1');
                    this.setState({
                        itemsOrigin: JSON.parse(JSON.stringify(items)),
                        itemsCurrentOrigin: JSON.parse(JSON.stringify(items)),
                        itemsCurrent: JSON.parse(JSON.stringify(items)),
                        items
                    });
                });
            });

        } else if (this.props.eventsObject[categoryId] && !this.props.eventsObject[categoryId+'items']) {
            const subcategories = this.props.eventsObject[categoryId];
            subcategories.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            });
            this.props.startSetItems(categoryId).then((items)=> {
                items.sort((a, b) => {
                    return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
                });
                //console.log('in 2');
                this.setState({
                    subCategoriesOrigin: JSON.parse(JSON.stringify(subcategories)),
                    subCategories: subcategories,
                    itemsOrigin: JSON.parse(JSON.stringify(items)),
                    itemsCurrentOrigin: JSON.parse(JSON.stringify(items)),
                    itemsCurrent: JSON.parse(JSON.stringify(items)),
                    items
                });
            });
        } else {
            const subcategories = this.props.eventsObject[categoryId];
            subcategories.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            });
            const itemsSet = this.props.eventsObject[categoryId+'items'];
            itemsSet.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            });
            //console.log('in 3');

            //console.log(this.state.subcategoryId);
            //console.log(this.props.eventsObject.subcategoryId);
            if (this.props.eventsObject.subcategoryId === '' || !this.props.eventsObject.subcategoryId) {
                itemsSet.map((event, index) => {
                    itemsCurrent.push(event);
                });
            } else {
                itemsSet.map((event, index) => {
                    if(event.subcategories[this.props.eventsObject.subcategoryId] === true) {
                        itemsCurrent.push(event);
                    }
                });
                itemsCurrent.sort((a, b) => {
                    return a.subcategories[subcategoryId+'order'] > b.subcategories[subcategoryId+'order'] ? 1 : -1;
                });
            }

            this.setState({
                subCategoriesOrigin: JSON.parse(JSON.stringify(subcategories)),
                subCategories: subcategories,
                itemsOrigin: JSON.parse(JSON.stringify(itemsSet)),
                itemsCurrentOrigin: JSON.parse(JSON.stringify(itemsCurrent)),
                itemsCurrent: JSON.parse(JSON.stringify(itemsCurrent)),
                items: itemsSet
            });
        }
        
    }


    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }



    // update database . ---   category data ( name, text, showlines - number of lines to show on load)

    onUpdateCategory = () => {
        const category = JSON.parse(JSON.stringify(this.state.category));
        this.props.startEditCategory(category);
        this.setState(() => ({ homepageOrigin: category }));
    }

    onCategoryNameChange = (e) => {
        const category = this.state.category;
        category.name = e.target.value;
        this.setState({
            category
        });
    }

    onCategoryTextChange = (e) => {
        const category = this.state.category;
        category.text = e.target.value;
        this.setState({
            category
        });
    }

    onCategoryShowLinesChange = (e) => {
        const category = this.state.category;
        category.showLines = e.target.value;
        this.setState({
            category
        });
    }

    startAddNewItem = () => {        
        this.setState({
            newItemNameModalIsOpen: true
        });
    }

    addNewItem = () => {
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const name = this.state.newItemName;
        const order = this.state.itemsCurrent.length+1;
        const catOrder = this.state.items.length+1;
        const event = {
            name: name,
            image: '',
            visible: false,
            categories: {
                [categoryId]: true,
                [categoryId+'order']: catOrder
            },
            subcategories: {
                [subcategoryId]: true,
                [subcategoryId+'order']: order
            }
        };
        //console.log(event);

        this.props.eventsObject.allSubCategories.map((subcategory, index) => {
            let obj = subcategory.categories;
            if (subcategory.id === subcategoryId) {
                const categoriesArr = [];
                Object.keys(obj).map((key) => {
                    const keyedObj = {id: String(key), ...obj[key]};
                    if (!String(key).includes("order")) {
                        categoriesArr.push(keyedObj);
                    }
                });
                //console.log('befor categoriesArr.map');
                //console.log(event);
                categoriesArr.map((catId, index) => {
                    if (event.categories) {
                        if(event.categories[catId.id] !== true) {
                            event.categories[catId.id] = true;
                            event.categories[catId.id+'order'] = this.props.eventsObject[catId.id+'items'].length+1;
                        }
                    } else {
                        const categoryObject = {
                            [catId.id]: true,
                            [catId.id+'order']: this.props.eventsObject[catId.id+'items'].length+1
                        }
                        event.categories = categoryObject;
                    }
                });
            }
        });





        //console.log(event);

        this.props.startAddItem(event, categoryId, catOrder, subcategoryId, order).then((items)=> {
            this.getAllData(categoryId, subcategoryId);
            this.setState({
                newItemNameModalIsOpen: false,
                newItemName: ''
            });
        });
        
    }

    onNewItemNameChange = (e) => {
        const newItemName = e.target.value;
        this.setState({
            newItemName
        });
    }

    onToggleNewItemName = () => {
        this.setState({
            newItemNameModalIsOpen: !this.state.newItemNameModalIsOpen
        });
    }

    startAddNewSubcategory = () => {

        this.setState({
            newSubcategoryNameModalIsOpen: true
        });
    }

    addNewSubcategory = () => {
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const name = this.state.newSubcategoryName;
        const subcategory = {
            name: name,
            visible: false,
            categories: {
                [categoryId]: true
            }
        };
        const order = this.state.subCategories.length+1;
        this.props.startAddSubcategory(subcategory, order).then((subCategories)=> {
            this.getAllData(categoryId, subcategoryId);
            this.setState({
                newSubcategoryNameModalIsOpen: false,
                newSubcategoryName: ''
            });
        });
        
    }

    onNewSubcategoryNameChange = (e) => {
        const newSubcategoryName = e.target.value;
        this.setState({
            newSubcategoryName
        });
    }

    onToggleNewSubcategoryName = () => {
        this.setState({
            newSubcategoryNameModalIsOpen: !this.state.newSubcategoryNameModalIsOpen
        });
    }

    setSubcategoryId = (e) => {
        const categoryId = this.state.category.id;
        const subcategoryId = e.target.dataset.id;
        this.setState({
            subcategoryId
        });
        this.props.setCategoryId(categoryId);
        this.props.setSubcategoryId(subcategoryId);
        let itemsCurrent = [];
        let setOrder = 0;
        if (subcategoryId === '') {
            const storeEvents = this.props.eventsObject[categoryId+'items'];
            this.setState({
                items: storeEvents
            });
            //console.log(this.state.items);
            itemsCurrent = JSON.parse(JSON.stringify(storeEvents));
            //console.log("sorting");
            itemsCurrent.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            });
            //console.log(categoryId);
            //console.log(itemsCurrent);
        } else {
            this.state.items.map((item, index) => {
                if (item.subcategories[subcategoryId] === true) {
                    setOrder++;
                    if (!item.subcategories[subcategoryId+'order']) {
                        item.subcategories[subcategoryId+'order'] = setOrder;
                        item.categories[categoryId+'order'] = index;
                        this.state.items[index].subcategories[subcategoryId+'order'] = setOrder;
                    }
                    itemsCurrent.push(item);
                }
            });
            itemsCurrent.sort((a, b) => {
                return a.subcategories[subcategoryId+'order'] > b.subcategories[subcategoryId+'order'] ? 1 : -1;
            });
        }
        
        this.setState({
            itemsCurrentOrigin: JSON.parse(JSON.stringify(itemsCurrent)),
            itemsCurrent
        });
    }

    onEventRollOver = (e) => {
        //console.log(e.target);
        //console.log(e.target.dataset.id);
        //console.log(e.target.dataset.name);
    }


    

    startEditSubcategory = () => {
        this.setState({
            hideSubcategoriesEditPanel: !this.state.hideSubcategoriesEditPanel
        });
    }

    onToggleEditSubcategory = () => {
        this.setState({
            hideSubcategoriesEditPanel: !this.state.hideSubcategoriesEditPanel
        });
    }

    editCategory = () => {
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const name = this.state.newItemName;
        const order = this.state.itemsCurrent.length+1;
        const catOrder = this.state.items.length+1;
        const item = {
            name: name,
            image: '',
            visible: false,
            categories: {
                [categoryId]: true,
                [categoryId+'order']: catOrder
            },
            subcategories: {
                [subcategoryId]: true,
                [subcategoryId+'order']: order
            }
        };
        this.props.startAddItem(item, categoryId, catOrder, subcategoryId, order).then((items)=> {
            this.setState({
                items,
                newItemNameModalIsOpen: false,
                newItemName: ''
            });
        });
        
    }

    onSubategoryNameChange = (e) => {
        const index = e.target.dataset.index;
        const subCategoryNewName = e.target.value;
        const subCategories = this.state.subCategories;
        subCategories[index].name = subCategoryNewName;
        this.setState({
            subCategories
        });
    }

    onSubcategoryOrderBlur = (e) => {
        const subCategories = this.state.subCategories;
        const categoryId = this.state.category.id;
        let newOrder = e.target.value;
        if (newOrder > subCategories.length) {
            newOrder = subCategories.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;
        if ( Number(newOrder) > Number(oldOrder) ) {
            for (let i = 0; i < subCategories.length; i++) {
                if (id !== subCategories[i].id) {
                    if (subCategories[i].categories[categoryId+'order'] <= newOrder && subCategories[i].categories[categoryId+'order'] > oldOrder) {
                        subCategories[i].categories[categoryId+'order'] = subCategories[i].categories[categoryId+'order']-1;
                    }
                }
            }
        } else if ( Number(newOrder) < Number(oldOrder) ) {
            for (let i = 0; i < subCategories.length; i++) {
                
                if (id !== subCategories[i].id) {
                    if (subCategories[i].categories[categoryId+'order'] < oldOrder && subCategories[i].categories[categoryId+'order'] >= newOrder) {
                        subCategories[i].categories[categoryId+'order'] = Number(subCategories[i].categories[categoryId+'order'])+1;
                    }
                }
            }
        }
        subCategories.sort((a, b) => {
            return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
        });
        this.setState({
            subCategories
        });
    }

    onSubcategoryOrderChange = (e) => {
        const subCategories = this.state.subCategories;
        const categoryId = this.state.category.id;
        let newOrder = e.target.value;
        if (newOrder > subCategories.length) {
            newOrder = subCategories.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        subCategories[e.target.dataset.index].categories[categoryId+'order'] = Number(newOrder);
        this.setState({
            subCategories
        });
    }

    onSubcategoryOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubcategoryOrderBlur(e);
        }
    }

    updateSubcategories = () => {
        const categoryId = this.state.category.id;
        const subcategories = this.state.subCategories;
        const fbSubCategories = {};
        subcategories.map((subcategory, index) => {
            fbSubCategories[subcategory.id] = subcategory;
        })
        this.props.startEditSubCategories(fbSubCategories, subcategories, categoryId);
    }

    toggleHookSubcategory = (e) => {
        const categoryId = this.state.category.id;
        const subcategoryId = e.target.dataset.id;
        //console.log(subcategoryId);
        const subCategoryIndex = e.target.dataset.index;
        let showStatus = e.target.dataset.showstatus;
        if (showStatus === 'true') {
            showStatus = true;
        } else if (showStatus === 'false') {
            showStatus = null;
        }
        const fbSubcategoriesToUpdate = {};
        const fbEventsToUpdate = {};
        const subcategoriesToUpdate = [];
        const subcategories = this.state.subCategories;
        if (showStatus === null) {
            subcategories.map((subcategory, index) => {
                if(subcategory.id === subcategoryId) {
                    subcategory.categories[categoryId] = null;
                    subcategory.categories[categoryId+'order'] = null;
                    fbSubcategoriesToUpdate[subcategory.id] = subcategory;
                }
                if(subcategory.categories[categoryId+'order'] > subCategoryIndex) {
                    subcategory.categories[categoryId+'order'] = subcategory.categories[categoryId+'order']-1;
                    fbSubcategoriesToUpdate[subcategory.id] = subcategory;
                }
                subcategoriesToUpdate.push(subcategory);
            });
            // collect items to remove
            const eventsForReorder = [];
            const eventsToRemove = [];
            const newAllItems = [];
            this.state.items.map((event, index) => {
                if (event.subcategories[subcategoryId] === true) {
                    let eventExists = false;
                    let obj = event.subcategories;
                    const subcategoriesArr = [];
                    Object.keys(obj).map((key) => {
                        const keyedObj = {id: String(key), ...obj[key]};
                        if (!String(key).includes("order")) {
                            subcategoriesArr.push(keyedObj);
                        }
                    });

                    subcategoriesArr.map((subcategory, index) => {
                        this.state.allSubCategories.map((allSubcategory, index) => {
                            if(subcategory.id === allSubcategory.id) {
                                //console.log(allSubcategory);
                                if(allSubcategory.id !== subcategoryId) {
                                    if (allSubcategory.categories[categoryId] === true) {
                                        eventExists = true;
                                    }
                                }
                            }
                        })
                    })

                    if (eventExists === false) {
                        // add removed item to forOrder list
                        eventsForReorder.push(JSON.parse(JSON.stringify(event)));
                        // update item vars for db
                        event.categories[categoryId] = null;
                        event.categories[categoryId+'order'] = null;
                        eventsToRemove.push(event);
                        fbEventsToUpdate[event.id] = event;
                    }
                    
                } else {
                    newAllItems.push(event);
                }
                //console.log(event.subcategories);
            });

            //console.log(this.state.subcategories);
            

            // . reorder category items

            //sort removed from top to bottom
            eventsForReorder.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? -1 : 1;
            });
            eventsForReorder.map((event, index) => {
                const removedIndex = event.categories[categoryId+'order'];
                newAllItems.map((allEvent, index) => {
                    if (allEvent.categories[categoryId+'order'] >= removedIndex) {
                        allEvent.categories[categoryId+'order'] = allEvent.categories[categoryId+'order'] - 1;
                        fbEventsToUpdate[allEvent.id] = allEvent;
                    }
                })
            });
        } else {
            const eventsToAdd = [];
            let orderCounter = Number(this.state.items.length);
            this.props.eventsObject.allEvents.map((event, index) => {
                if (event.subcategories) {
                    if (event.subcategories[subcategoryId] === true) {


                        let eventExists = false;
                        let obj = event.subcategories;
                        const subcategoriesArr = [];
                        Object.keys(obj).map((key) => {
                            const keyedObj = {id: String(key), ...obj[key]};
                            if (!String(key).includes("order")) {
                                subcategoriesArr.push(keyedObj);
                            }
                        });


                        subcategoriesArr.map((subcategory, index) => {
                            this.state.allSubCategories.map((allSubcategory, index) => {
                                if(subcategory.id === allSubcategory.id) {
                                    //console.log(allSubcategory);
                                    if(allSubcategory.id !== subcategoryId) {
                                        if (allSubcategory.categories[categoryId] === true) {
                                            eventExists = true;
                                        }
                                    }
                                }
                            })
                        })



                        if (eventExists === false) {
                            orderCounter++
                            if (event.categories) {
                                event.categories[categoryId] = showStatus;
                                event.categories[categoryId+'order'] = orderCounter;
                            } else {
                                const eventToAddObject = {
                                    [categoryId]: showStatus,
                                    [categoryId+'order']: orderCounter
                                }
                                event.categories = eventToAddObject;
                            }
                            
                            eventsToAdd.push(event);
                            fbEventsToUpdate[event.id] = event;
                        }
                    }
                }
                
            });
            this.props.eventsObject.allSubCategories.map((subCategory, index) => {
                if (subCategory.id === subcategoryId) {
                    const subcategoryId = e.target.dataset.id;
                    const categoryId = this.state.category.id;
                    const categoryOrder = Number(this.state.subCategories.length)+1;
                    const subcategoryToAdd =  subCategory;
                    if (!subcategoryToAdd.categories) {
                        subcategoryToAdd.categories = {};
                    }
                    // console.log(subcategoryToAdd);
                    // console.log(categoryId);
                    // console.log(showStatus);
                    subcategoryToAdd.categories[categoryId] = showStatus;
                    subcategoryToAdd.categories[categoryId+'order'] = categoryOrder;
                    const subcategoryAllOrder = index;
                    fbSubcategoriesToUpdate[subcategoryId] = subcategoryToAdd;
                }
            });
        }


        this.props.startHookSubcategory( fbSubcategoriesToUpdate, fbEventsToUpdate ).then((res) => {
            this.getAllData(categoryId, subcategoryId);
            // this.props.startSetSubcategories(categoryId).then((subCategories)=> {
            //     if(subCategories.length>1){
            //         subCategories.sort((a, b) => {
            //             return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            //         });
            //     }
            //     this.setState({
            //         subCategoriesOrigin: JSON.parse(JSON.stringify(subCategories)),
            //         subCategories
            //     });
            //     this.props.startSetItems(categoryId).then((items)=> {
            //         this.setState({
            //             items,
            //             itemsOrigin: JSON.parse(JSON.stringify(items)),
            //             itemsCurrentOrigin: JSON.parse(JSON.stringify(items)),
            //             itemsCurrent: JSON.parse(JSON.stringify(items))
            //         });
            //     });
            //     this.props.startSetAllSubcategories().then(() => {
            //         this.setState({
            //             allSubCategories: JSON.parse(JSON.stringify(this.props.eventsObject.allSubCategories))
            //         });
            //         this.props.startSetAllEvents();
            //     });
            // });
            if(showStatus === true) {
                this.onToggleNewSubcategoryName();
            }
        });
    }


    toggleShowItem = (e) => {
        //console.log('in toggle show item');
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const eventId = e.target.dataset.id;
        let visible = e.target.dataset.visible;
        if (visible === 'true') {
            visible = true;
        } else if (visible === 'false') {
            visible = false;
        }
        this.props.startToggleShowEvent(categoryId, subcategoryId, eventId, visible).then((res) => {
            const items = JSON.parse(JSON.stringify(this.state.items));
            let itemsIndex = 0;
            items.map((item, index) => {
                if ( item.id === eventId ) {
                    itemsIndex = index;
                }
            })
            items[itemsIndex].visible = visible;
            const itemsCurrent = JSON.parse(JSON.stringify(this.state.itemsCurrent));
            let itemsCurrentIndex = 0;
            itemsCurrent.map((item, index) => {
                if ( item.id === eventId ) {
                    itemsCurrentIndex = index;
                }
            })
            itemsCurrent[itemsCurrentIndex].visible = visible;
            this.setState({
                itemsOrigin: JSON.parse(JSON.stringify(items)),
                items: items,
                itemsCurrentOrigin: JSON.parse(JSON.stringify(itemsCurrent)),
                itemsCurrent: itemsCurrent
            });
        });
    }


    toggleShowSubcategory = (e) => {
        const categoryId = this.state.category.id;
        const subcategoryId = e.target.dataset.id;
        let visible = e.target.dataset.visible;
        if (visible === 'true') {
            visible = true;
        } else if (visible === 'false') {
            visible = false;
        }
        this.props.startToggleShowSubcategory(categoryId, subcategoryId, visible).then((res) => {
            const subcategories = JSON.parse(JSON.stringify(this.state.subCategories));
            let subcategoriesIndex = 0;
            subcategories.map((subcategory, index) => {
                if ( subcategory.id === subcategoryId ) {
                    subcategoriesIndex = index;
                }
            })
            subcategories[subcategoriesIndex].visible = visible;
            this.setState({
                subCategoriesOrigin: JSON.parse(JSON.stringify(subcategories)),
                subCategories: subcategories
            });
        });
    }











    toggleHookEvent = (e) => {
        //console.log('in toggle hook event');
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const eventId = e.target.dataset.id;
        //console.log(categoryId);
        //console.log(subcategoryId);
        //console.log(eventId);
        const eventIndex = e.target.dataset.order;
        let showStatus = e.target.dataset.showstatus;
        if (showStatus === 'true') {
            showStatus = true;
        } else if (showStatus === 'false') {
            showStatus = null;
        }

        const fbEventsToUpdate = {};
        let eventsToUpdate = [];
        const subcategories = this.state.subCategories;
        const eventsAll = this.state.allEvents;
        const events = this.state.items;
        let eventsCurrent = [];
        let eventCategoryIndex = 0;
        if (showStatus === null) {
            let eventExists = false;
            let globalEvent = {};
            //console.log('in null');
            //console.log(eventsCurrent);
            this.props.eventsObject.allEvents.map((event, index) => {
                if (event.id === eventId) {
                    globalEvent = event;
                    //console.log(event);
                }
                if (event.subcategories) {
                    if (event.subcategories[subcategoryId]===true) {
                        eventsCurrent.push(event);
                    }
                }
            });
            //console.log(eventsCurrent);
            eventsCurrent.map((event, index) => {
                // find un-hooked event in current subcategory
                if (event.id === eventId) {
                    
                    //console.log(globalEvent);
                    // get event's oreder in category all events
                    eventCategoryIndex = event.categories[categoryId+'order'];
                    // un-hook event from subcategory
                    event.subcategories[subcategoryId] = null;
                    event.subcategories[subcategoryId+'order'] = null;
                    // add event to firebase update list
                    fbEventsToUpdate[event.id] = event;
                    // check if event exists in another subcategory in current category
                    subcategories.map((subcategory, index) => {
                        if (subcategory.id !== subcategoryId) {
                            if (event.subcategories[subcategory.id] === true) {
                                //console.log('found subcategory - item exists!')
                                eventExists = true;
                            }
                        }
                    });
                }
                //console.log('unhooked and re-ordering');
                //console.log('event index', eventIndex);
                // re-order events in sub category after event un-hook
                if (event.subcategories[subcategoryId+'order'] > eventIndex) {
                    //console.log('in event order', event.subcategories[subcategoryId+'order']);
                    event.subcategories[subcategoryId+'order'] = event.subcategories[subcategoryId+'order']-1;
                    fbEventsToUpdate[event.id] = event;
                }
                eventsToUpdate.push(event);
            });

            //console.log(fbEventsToUpdate);



            // if event does not exists in other subcategory in current category - remove from category
            if (eventExists === false) {
                eventsToUpdate = [];
                // go over all category events
                events.map((event, index) => {
                    // find the event and un-hook it from category and subcategory
                    if (event.id === eventId) {
                        event.categories[categoryId] = null;
                        event.categories[categoryId+'order'] = null;
                        event.subcategories[subcategoryId] = null;
                        event.subcategories[subcategoryId+'order'] = null;
                        fbEventsToUpdate[event.id] = event;
                    }
                    // re-set events order in current category all events
                    //console.log(eventCategoryIndex);
                    if (event.categories[categoryId+'order'] > eventCategoryIndex) {
                        event.categories[categoryId+'order'] = event.categories[categoryId+'order']-1;
                        if (fbEventsToUpdate[event.id]) {
                            event.subcategories[subcategoryId] = fbEventsToUpdate[event.id].subcategories[subcategoryId];
                            event.subcategories[subcategoryId+'order'] = fbEventsToUpdate[event.id].subcategories[subcategoryId+'order'];
                        }
                        fbEventsToUpdate[event.id] = event;
                    }
                    eventsToUpdate.push(event);
                });
            }
            
            //console.log(fbEventsToUpdate);




            //console.log(globalEvent);

            // get current subcategory object from store all subcategories
            this.props.eventsObject.allSubCategories.map((subcategory, index) => {
                let obj = subcategory.categories;
                // find current subcategory by mapped id
                if (subcategory.id === subcategoryId) {
                    // get all categories this subcategory is hooked to
                    const categoriesArr = [];
                    Object.keys(obj).map((key) => {
                        const keyedObj = {id: String(key), ...obj[key]};
                        if (!String(key).includes("order")) {
                            categoriesArr.push(keyedObj);
                        }
                    });
                    //console.log(' //  ---   categoriesArr');
                    //console.log(categoriesArr);
                    // get all other categories potentially influenced by this event un-hook
                    categoriesArr.map((catId, index) => {
                        // skip current category
                        if (catId.id !== categoryId) {
                            eventExists = false;
                            //console.log(' //  ---   catId.id');
                            //console.log(catId.id);
                            // if checked category has more than one subcategory hooked then proceed
                            if (this.props.eventsObject[catId.id].length > 1) {
                                // check all categorie's subcategories for existing item in other subcategory
                                this.props.eventsObject[catId.id].map((subcategory, index) => {
                                    // skip current subcategory
                                    if (subcategory.id !== subcategoryId) {
                                        //console.log(' //  ---   subcategory.id');
                                        //console.log(subcategory.id);
                                        //console.log(globalEvent.subcategories[subcategory.id]);
                                        // if event is hooked to other subcategory - do nothing
                                        if (globalEvent.subcategories[subcategory.id] === true){
                                            eventExists = true;
                                        }
                                    }
                                });
                                //console.log(eventExists+' for event still exists in category - '+catId.id);
                            }
                            //console.log(globalEvent);
                            //console.log(eventExists);
                            // if event does not exist on other subcategory on other category - re-order other category
                            if (eventExists === false) {
                                // go over all events in other category
                                this.props.eventsObject[catId.id+'items'].map((event, index) => {
                                    // console.log('event');
                                    // console.log(event);
                                    // console.log('event order');
                                    // console.log(event.categories[catId.id+'order']);
                                    // console.log('global event order');
                                    // console.log(globalEvent.categories[catId.id+'order']);
                                    // find event and remove other category hook to remove list
                                    //console.log(eventId);
                                    if (event.id === eventId) {
                                        //console.log('found');
                                        fbEventsToUpdate[event.id].categories[catId.id] = null;
                                        fbEventsToUpdate[event.id].categories[catId.id+'order'] = null;
                                    } else {
                                        // or re-order other event
                                        if (event.categories[catId.id+'order'] > globalEvent.categories[catId.id+'order']) {
                                            event.categories[catId.id+'order'] = event.categories[catId.id+'order'] - 1;
                                            // console.log('event.categories[catId.id+order');
                                            // console.log(event.categories[catId.id+'order']);
                                            // if other event exists on remove list - update new other category order
                                            if (fbEventsToUpdate[event.id]) {
                                                fbEventsToUpdate[event.id].categories[catId.id+'order'] = event.categories[catId.id+'order'];
                                            } else {
                                                // if other event dose not exist on remove list - add event to remove list
                                                fbEventsToUpdate[event.id] = event;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //console.log(fbEventsToUpdate);  
                    });
                }
            });

        } else {
            this.props.eventsObject.allEvents.map((event, index) => {
                if (event.subcategories) {
                    if (event.subcategories[subcategoryId]===true) {
                        //console.log('found event!!');
                        eventsCurrent.push(event);
                    }
                }
            });
            eventsAll.map((event, index) => {
                
                if (event.id === eventId) {
                    //console.log(eventsCurrent);
                    //console.log(eventsCurrent.length);
                    if (event.subcategories) {
                        event.subcategories[subcategoryId] = true;
                        event.subcategories[subcategoryId+'order'] = eventsCurrent.length+1;
                    } else {
                        const subcategoryObject = {
                            [subcategoryId]: true,
                            [subcategoryId+'order']: eventsCurrent.length+1
                        }
                        event.subcategories = subcategoryObject;
                    }

                    this.props.eventsObject.allSubCategories.map((subcategory, index) => {
                        let obj = subcategory.categories;
                        if (subcategory.id === subcategoryId) {
                            const categoriesArr = [];
                            Object.keys(obj).map((key) => {
                                const keyedObj = {id: String(key), ...obj[key]};
                                if (!String(key).includes("order")) {
                                    categoriesArr.push(keyedObj);
                                }
                            });
                            //console.log('befor categoriesArr.map');
                            //console.log(event);
                            categoriesArr.map((catId, index) => {
                                if (event.categories) {
                                    if(event.categories[catId.id] !== true) {
                                        event.categories[catId.id] = true;
                                        event.categories[catId.id+'order'] = this.props.eventsObject[catId.id+'items'].length+1;
                                    }
                                } else {
                                    const categoryObject = {
                                        [catId.id]: true,
                                        [catId.id+'order']: this.props.eventsObject[catId.id+'items'].length+1
                                    }
                                    event.categories = categoryObject;
                                }
                            });
                        }
                    });
                    //console.log(fbEventsToUpdate[event.id]);
                    fbEventsToUpdate[event.id] = event;
                    //console.log(fbEventsToUpdate[event.id]);
                    eventsToUpdate.push(event);
                }
                //console.log(fbEventsToUpdate);
            });
        }

            
        //console.log('before hook event');
        this.props.startHookEvent( fbEventsToUpdate ).then((res) => {
            // get all hooked subcategories in current category in redux store and state
            //console.log('in start hook event');
            this.getAllData(categoryId, subcategoryId);
            if(showStatus === true) {
                this.onToggleNewItemName();
            }
        
        });
    }




    getAllData = (categoryId, subcategoryId) => {
        //console.log('in get all data');
        this.props.startSetSubcategories(categoryId).then((subCategories)=> {
            if(subCategories.length>1){
                subCategories.sort((a, b) => {
                    return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
                });
            }
            this.setState({
                subCategoriesOrigin: JSON.parse(JSON.stringify(subCategories)),
                subCategories
            });

            // get all items in all other categories (except current category) in redux store
            this.props.eventsObject.categories.map((category, index) => {
                if (category.id !== categoryId) {
                    // get items for each other category
                    this.props.startSetItems(category.id).then((items)=> {
                        //console.log('set '+category.id)
                    });
                }
            });
            
            // get items for current category and update state
            this.props.startSetItems(categoryId).then((items)=> {
                const itemsCurrent = [];
                items.map((item, index) => {
                    if (this.state.subcategoryId === '') {
                        itemsCurrent.push(item);
                    } else if (item.subcategories[subcategoryId] === true) {
                        itemsCurrent.push(item);
                    }
                });
                if (this.state.subcategoryId === '') {
                    itemsCurrent.sort((a, b) => {
                        return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
                    });
                } else {
                    itemsCurrent.sort((a, b) => {
                        return a.subcategories[subcategoryId+'order'] > b.subcategories[subcategoryId+'order'] ? 1 : -1;
                    });
                }
                //console.log(itemsCurrent);
                this.setState({
                    items,
                    itemsOrigin: JSON.parse(JSON.stringify(items)),
                    itemsCurrentOrigin: JSON.parse(JSON.stringify(itemsCurrent)),
                    itemsCurrent: JSON.parse(JSON.stringify(itemsCurrent))
                });
            });
            this.props.startSetAllSubcategories().then(() => {
                //console.log(this.props.eventsObject.allSubCategories);
                this.setState({
                    allSubCategories: JSON.parse(JSON.stringify(this.props.eventsObject.allSubCategories))
                });
                this.props.startSetAllEvents().then(() => {
                //console.log(this.props.eventsObject.allEvents);
                this.setState({
                    allEvents: JSON.parse(JSON.stringify(this.props.eventsObject.allEvents))
                });
            });
            });
        });
    }





    onItemOrderBlur = (e) => {
        const type = e.target.dataset.type;
        const items = this.state.items;
        const itemsCurrent = this.state.itemsCurrent;
        const itemId = e.target.dataset.id;
        const categoryId = this.state.category.id;
        const subcategoryId = e.target.dataset.subcategoryid;
        const index = e.target.dataset.index;
        const subCategories = this.state.subCategories; 
        let newOrder = e.target.value;
        if (newOrder > itemsCurrent.length) {
            newOrder = itemsCurrent.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;


        if (type==="all") {
            if ( Number(newOrder) > Number(oldOrder) ) {
                for (let i = 0; i < itemsCurrent.length; i++) {
                    if (id !== itemsCurrent[i].id) {
                        if (itemsCurrent[i].categories[categoryId+'order'] <= newOrder && itemsCurrent[i].categories[categoryId+'order'] > oldOrder) {
                            itemsCurrent[i].categories[categoryId+'order'] = itemsCurrent[i].categories[categoryId+'order']-1;
                            //items[itemsCurrent[i].categories[categoryId+'order']].subcategories[subcategoryId+'order'] = itemsCurrent[i].subcategories[subcategoryId+'order'];
                        }
                    }
                }
            } else if ( Number(newOrder) < Number(oldOrder) ) {
                for (let i = 0; i < itemsCurrent.length; i++) {
                    
                    if (id !== itemsCurrent[i].id) {
                        if (itemsCurrent[i].categories[categoryId+'order'] < oldOrder && itemsCurrent[i].categories[categoryId+'order'] >= newOrder) {
                            itemsCurrent[i].categories[categoryId+'order'] = Number(itemsCurrent[i].categories[categoryId+'order'])+1;
                            //items[itemsCurrent[i].categories[categoryId+'order']].subcategories[subcategoryId+'order'] = itemsCurrent[i].subcategories[subcategoryId+'order'];
                        }
                    }
                }
            }
            itemsCurrent.sort((a, b) => {
                return a.categories[categoryId+'order'] > b.categories[categoryId+'order'] ? 1 : -1;
            });
        } else {
            if ( Number(newOrder) > Number(oldOrder) ) {
                for (let i = 0; i < itemsCurrent.length; i++) {
                    if (id !== itemsCurrent[i].id) {
                        if (itemsCurrent[i].subcategories[subcategoryId+'order'] <= newOrder && itemsCurrent[i].subcategories[subcategoryId+'order'] > oldOrder) {
                            itemsCurrent[i].subcategories[subcategoryId+'order'] = itemsCurrent[i].subcategories[subcategoryId+'order']-1;
                            //items[itemsCurrent[i].categories[categoryId+'order']].subcategories[subcategoryId+'order'] = itemsCurrent[i].subcategories[subcategoryId+'order'];
                        }
                    }
                }
            } else if ( Number(newOrder) < Number(oldOrder) ) {
                for (let i = 0; i < itemsCurrent.length; i++) {
                    
                    if (id !== itemsCurrent[i].id) {
                        if (itemsCurrent[i].subcategories[subcategoryId+'order'] < oldOrder && itemsCurrent[i].subcategories[subcategoryId+'order'] >= newOrder) {
                            itemsCurrent[i].subcategories[subcategoryId+'order'] = Number(itemsCurrent[i].subcategories[subcategoryId+'order'])+1;
                            //items[itemsCurrent[i].categories[categoryId+'order']].subcategories[subcategoryId+'order'] = itemsCurrent[i].subcategories[subcategoryId+'order'];
                        }
                    }
                }
            }
            itemsCurrent.sort((a, b) => {
                return a.subcategories[subcategoryId+'order'] > b.subcategories[subcategoryId+'order'] ? 1 : -1;
            });
        }


        
        this.setState({
            items,
            itemsCurrent
        });
    }

    onItemOrderChange = (e) => {
        const type = e.target.dataset.type;
        const items = this.state.items;
        const itemsCurrent = this.state.itemsCurrent;
        const itemId = e.target.dataset.id;
        const categoryId = this.state.category.id;
        const subcategoryId = e.target.dataset.subcategoryid;
        const index = e.target.dataset.index;
        let newOrder = e.target.value;
        if (newOrder > itemsCurrent.length) {
            newOrder = itemsCurrent.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(index)+1;
        if (type==="all") {
            itemsCurrent[index].categories[categoryId+'order'] = Number(newOrder);
        } else {
            itemsCurrent[index].subcategories[subcategoryId+'order'] = Number(newOrder);
        }
        
        this.setState({
            itemsCurrent
        });
    }

    onItemOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onItemOrderBlur(e);
        }
    }


    updateItems = () => {
        const categoryId = this.state.category.id;
        const subcategoryId = this.state.subcategoryId;
        const itemsCurrent = this.state.itemsCurrent;
        let events = this.state.items;
        if ( subcategoryId === '' ) {
            events = this.state.itemsCurrent;
        }
        
        const fbEvents = {};
        itemsCurrent.map((item, index) => {
            fbEvents[item.id] = item;
        })
        this.props.startEditEvents(fbEvents, events, categoryId);
    }

    onToggleSeo = () => {
        this.setState({
            seoModalIsOpen: !this.state.seoModalIsOpen
        });
    }

    onSeoTitleChange = (e) => {
        const title = e.target.value;
        const seo = this.state.seo;
        seo.title = title;
        this.setState({
            seo
        });
    }

    onSeoDescriptionChange = (e) => {
        const description = e.target.value;
        const seo = this.state.seo;
        seo.description = description;
        this.setState({
            seo
        });
    }

    onSeoKeyWordsChange = (e) => {
        const keyWords = e.target.value;
        const seo = this.state.seo;
        seo.keyWords = keyWords;
        this.setState({
            seo
        });
    }

    updateSeo = () => {
        const seo = this.state.seo;
        const categoryId = this.state.category.id;
        this.props.startEditSeo(seo, categoryId);
        this.onToggleSeo();
    }



    render() {
        const popover = (
        <Popover id="modal-popover" title="popover">
            very popover. such engagement
        </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
        return (
            <div className="container-fluid">
                <Helmet>
                    <title>{`אורן הפקות - ${this.props.category.name} - ${this.state.seo.title}`}</title>
                    <meta name="description" content={this.state.seo.description} />
                </Helmet>


                <Modal
                    open={this.state.newSubcategoryNameModalIsOpen}
                    onClose={this.onToggleNewSubcategoryName}
                    center
                    classNames={{
                        // transitionEnter: 'transition-enter',
                        // transitionEnterActive: 'transition-enter-active',
                        // transitionExit: 'transition-exit-active',
                        // transitionExitActive: 'transition-exit-active',
                        overlay: 'custom-overlay',
                        modal: 'custom-modal',
                        closeButton: 'custom-close-button',
                        // closeIcon: 'custom-close-icon'                      
                    }}
                >
                    <h2 className="Heebo-Medium">הוספת תת-קטגוריה חדשה</h2>
                    <h4 className="Heebo-Regular">נא למלא שם לתת-הקטגוריה החדשה</h4>
                    <div dir="rtl">
                        <AutosizeInput
                            className="events__tabs__button"
                            type="text"
                            placeholder="שם תת-הקטגוריה"
                            value={this.state.newSubcategoryName}
                            onChange={this.onNewSubcategoryNameChange}
                        />
                        <Button bsStyle="success" onClick={this.addNewSubcategory}>המשך</Button>
                        <h2 className="Heebo-Medium margin-top">חיבור תת-קטגוריה קיימת</h2>
                        {
                            this.state.allSubCategories ?
                                this.state.allSubCategories.map((subCategory, index) => {
                                    if (!subCategory.categories || subCategory.categories[this.state.category.id] !== true) {
                                        return <button
                                                    key={subCategory.id}
                                                    data-id={subCategory.id}
                                                    data-showstatus={true}
                                                    className="events__tabs__button"
                                                    onClick={this.toggleHookSubcategory}
                                                >
                                                    {subCategory.name}
                                                </button>
                                    }
                                })
                            :
                                null
                        }
                    </div>
                </Modal>









                <Modal
                    open={this.state.newItemNameModalIsOpen}
                    onClose={this.onToggleNewItemName}
                    center
                    classNames={{
                        // transitionEnter: 'transition-enter',
                        // transitionEnterActive: 'transition-enter-active',
                        // transitionExit: 'transition-exit-active',
                        // transitionExitActive: 'transition-exit-active',
                        overlay: 'custom-overlay',
                        modal: 'custom-modal',
                        closeButton: 'custom-close-button',
                        // closeIcon: 'custom-close-icon'                      
                    }}
                >
                    <h2 className="Heebo-Medium">הוספת אירוע חדש</h2>
                    <h4 className="Heebo-Regular">נא למלא שם לאירוע החדש</h4>
                    <div dir="rtl">
                        <AutosizeInput
                            className="events__tabs__button"
                            type="text"
                            placeholder="שם אירוע"
                            value={this.state.newItemName}
                            onChange={this.onNewItemNameChange}
                        />
                        <Button bsStyle="success" onClick={this.addNewItem}>המשך</Button>
                        <h2 className="Heebo-Medium margin-top">חיבור אירוע קיים</h2>
                        {
                            this.state.allEvents ?
                                this.state.allEvents.map((event, index) => {
                                    if (!event.subcategories || event.subcategories[this.state.subcategoryId] !== true) {
                                        return <button
                                                    key={event.id}
                                                    data-id={event.id}
                                                    data-showstatus={true}
                                                    className="events__tabs__button"
                                                    onClick={this.toggleHookEvent}
                                                >
                                                    {event.name}
                                                </button>
                                    }
                                })
                            :
                                null
                        }
                    </div>
                </Modal>




                <Modal
                    open={this.state.seoModalIsOpen}
                    onClose={this.onToggleSeo}
                    center 
                    dir="rtl"
                >
                    <div className="backoffice__seo__modal">
                        <h4 className="Heebo-Regular">seo</h4>
                        <div className="backoffice__seo__modal__left">
                            <input
                                className="events__tabs__button"
                                type="text"
                                placeholder="כותרת לדף (title)"
                                value={this.state.seo.title}
                                onChange={this.onSeoTitleChange}
                            />
                            <br />
                            <textarea
                                type="text"
                                placeholder="תאור"
                                value={this.state.seo.description}
                                onChange={this.onSeoDescriptionChange}
                            />
                            <br />
                            <textarea
                                type="text"
                                placeholder="מילות מפתח"
                                value={this.state.seo.keyWords}
                                onChange={this.onSeoKeyWordsChange}
                            />
                            <br />
                        </div>
                        <div className="backoffice__seo__modal__right">
                            <input
                                value="כותרת"
                                readOnly
                            />
                            <br />
                            <textarea
                                value="תאור"
                                readOnly
                            />
                            <br />
                            <textarea
                                value="מילות מפתח"
                                readOnly
                            />
                            <br />
                        </div>
                        <Button bsStyle="success" onClick={this.updateSeo}>עדכון</Button>
                    </div>
                </Modal>

                

                
                <Navigation />
                <div className="homepage__structure">
                    <div className="events__left">

                        { 
                            this.props.isAuthenticated === true ? 
                                <div className="about__edit__panel__box">
                                    <div className="about__edit__panel">
                                        <button className="backoffice_button" onClick={this.props.startLogout}>
                                            <img className="backoffice_icon" src="/images/backoffice/exit.svg" />
                                        </button>
                                        <button className="backoffice_button" onClick={this.onToggleSeo}>
                                            seo
                                        </button>
                                    </div>
                                </div>
                            :
                                null
                        }

                        <EventsHeader
                            categoryName={this.state.category.name}
                            categoryId={this.state.category.id}
                            isAuthenticated={this.props.isAuthenticated}
                            onChange={this.onCategoryNameChange}
                            onUpdateCategory={this.onUpdateCategory}
                        />
                        <EventsTabs
                            categoryId={this.state.category.id}
                            subcategoryId={this.state.subcategoryId}
                            subCategories={this.state.subCategories}
                            isAuthenticated={this.props.isAuthenticated}
                            setSubcategoryId={this.setSubcategoryId}
                            startAddNewSubcategory={this.startAddNewSubcategory}
                            startEditSubcategory={this.startEditSubcategory}
                        />
                        { 
                            this.props.isAuthenticated === true ? 
                                <div className="backoffice__edit__events__tabs__box" hidden={this.state.hideSubcategoriesEditPanel}>
                                    {
                                        this.state.subCategories.length > 0 ?
                                            
                                            this.state.subCategories.map((subCategory, index) => {
                                                return  <div className="backoffice__edit__events__tabs__in__box" key={subCategory.id} dir="rtl">
                                                            <Button
                                                                id="btn-x"
                                                                data-id={subCategory.id}
                                                                data-index={subCategory.categories[this.state.category.id+'order']}
                                                                data-showstatus={false}
                                                                className="backoffice__events__tabs__remove btn-danger"
                                                                onClick={this.toggleHookSubcategory}
                                                            >
                                                                X
                                                            </Button>
                                                            <Button
                                                                id="btn-show"
                                                                data-id={subCategory.id}
                                                                data-visible={subCategory.visible === true ? false : true}
                                                                className={`backoffice__events__tabs__remove${subCategory.visible === true ? ' btn-success' : ' btn-danger'}`}
                                                                onClick={this.toggleShowSubcategory}
                                                            >
                                                                <img
                                                                    data-id={subCategory.id}
                                                                    data-visible={subCategory.visible === true ? false : true}
                                                                    className="backoffice__show__icon"
                                                                    src={`/images/backoffice/${subCategory.visible === true ? 'show' : 'hide'}.svg`} 
                                                                />
                                                            </Button>
                                                            <div className="backoffice__events__tabs__order__box">
                                                                <input
                                                                    id="number"
                                                                    data-id={subCategory.id}
                                                                    type="number"
                                                                    value={subCategory.categories[this.state.category.id+'order']}
                                                                    data-index={index}
                                                                    onChange={this.onSubcategoryOrderChange}
                                                                    onKeyPress={this.onSubcategoryOrderKeyPress}
                                                                    onBlur={this.onSubcategoryOrderBlur}
                                                                />
                                                            </div>
                                                            <AutosizeInput
                                                                data-id={subCategory.id}
                                                                data-index={index}
                                                                className="events__tabs__button"
                                                                type="text"
                                                                placeholder="שם תת קטגוריה"
                                                                value={this.state.subCategories[index].name}
                                                                onChange={this.onSubategoryNameChange}
                                                            />
                                                        </div>
                                            })
                                            
                                        :
                                            null
                                    }
                                    <div className="backoffice__events__tabs__update__box">
                                        <Button className="backoffice__events__tabs__update btn-success" onClick={this.updateSubcategories}>עדכון</Button>
                                    </div>
                                </div>
                            :
                                null
                        }
                        <EventsText 
                            categoryText={this.state.category.text}
                            showLines={this.state.category.showLines}
                            categoryId={this.state.category.id}
                            isAuthenticated={this.props.isAuthenticated}
                            onChange={this.onCategoryTextChange}
                            onCategoryShowLinesChange={this.onCategoryShowLinesChange}
                        />
                        <img className="events__seperator desktop" src="/images/eventspage/events-seperator.png" />
                        <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" />
                        <EventsEvents 
                            categoryName={this.state.category.name}
                            categoryText={this.state.category.text}
                            categoryId={this.state.category.id}
                            subcategoryId={this.state.subcategoryId}
                            isAuthenticated={this.props.isAuthenticated}
                            items={this.state.items}
                            itemsCurrent={this.state.itemsCurrent}
                            startAddNewItem={this.startAddNewItem}
                            ratioGreenArrow={this.state.ratioGreenArrow}
                            setIconRatioOn={this.setIconRatioOn}
                            setIconRatioOut={this.setIconRatioOut}
                            onRollOver={this.onEventRollOver}
                            uploadWidget={this.uploadWidget}
                            oneLine={false}
                            onItemOrderChange={this.onItemOrderChange}
                            onItemOrderKeyPress={this.onItemOrderKeyPress}
                            onItemOrderBlur={this.onItemOrderBlur}
                            toggleShowItem={this.toggleShowItem}
                            toggleHookEvent={this.toggleHookEvent}
                            updateItems={this.updateItems}
                        />
                    </div>
                    <SocialMedia
                        ratioFacebook={this.state.ratioFacebook}
                        ratioInstagram={this.state.ratioInstagram}
                        ratioMail={this.state.ratioMail}
                        ratioPhone={this.state.ratioPhone}
                        setIconRatioOn={this.setIconRatioOn}
                        setIconRatioOut={this.setIconRatioOut} 
                    />
                </div>

                <div hidden={this.state.pageupImageClassName === 'pageup__image'} className="pageup__image__fake desktop"> </div>
                <PageUpStrip
                    pageupImageClassName={this.state.pageupImageClassName}
                />
                <div id='fake_pageupstrip'> </div>

                <ContactStrip />
                <CustomersStrip />
                <Footer />
            </div>
        );
    }
} 

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    eventsObject: state.eventspage
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startAddCategory: (category) => dispatch(startAddCategory(category)),
    startAddSubcategory: (subcategory, order) => dispatch(startAddSubcategory(subcategory, order)),
    startSetSubcategories: (categoryId) => dispatch(startSetSubcategories(categoryId)),
    startAddItem: (item, categoryId, catOrder, subcategoryId, order) => dispatch(startAddItem(item, categoryId, catOrder, subcategoryId, order)),
    startSetItems: (categoryId) => dispatch(startSetItems(categoryId)),
    startUpdateEventImage: (id, image) => dispatch(startUpdateEventImage(id, image)),
    setCategoryId: (id) => dispatch(setCategoryId(id)),
    setSubcategoryId: (id) => dispatch(setSubcategoryId(id)),
    startEditCategory: (category) => dispatch(startEditCategory(category)),
    startEditSubCategories: (fbSubcategories, subcategories, categoryId) => dispatch(startEditSubCategories(fbSubcategories, subcategories, categoryId)),
    startHookSubcategory: ( fbSubcategoriesToUpdate, fbEventsToUpdate ) => dispatch(startHookSubcategory( fbSubcategoriesToUpdate, fbEventsToUpdate )),
    startHookEvent: ( fbEventsToUpdate ) => dispatch(startHookEvent( fbEventsToUpdate )),
    startToggleShowSubcategory: (categoryId, subcategoryId, visible) => dispatch(startToggleShowSubcategory(categoryId, subcategoryId, visible)),
    startToggleShowEvent: (categoryId, subcategoryId, eventId, visible) => dispatch(startToggleShowEvent(categoryId, subcategoryId, eventId, visible)),
    startEditEvents: ( fbEvents, events, categoryId ) => dispatch(startEditEvents( fbEvents, events, categoryId )),
    startSetAllSubcategories: () => dispatch(startSetAllSubcategories()),
    startSetAllEvents: () => dispatch(startSetAllEvents()),
    startEditSeo: (seo, categoryId) => dispatch(startEditSeo(seo, categoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);




// <Prompt
//                         style={{background: "red"}}
//                         when={!isEqual(itemOrigin, itemUpdate)}
//                         message="Are you sure you want to leave me?"
//                     />












// <Modal show={this.state.newSubcategoryNameModalIsOpen} onHide={this.onToggleNewSubcategoryName} dir="rtl">
//                     <Modal.Header bsClass="modalHeader" closeButton>
//                         <Modal.Title bsClass="modalTitle Heebo-Medium">
//                         הוספת תת-קטגוריה חדשה
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body bsClass="modalBody">
//                         <h4 className="Heebo-Regular">נא למלא שם לתת-הקטגוריה החדשה</h4>
//                         <AutosizeInput
//                             className="events__tabs__button"
//                             type="text"
//                             placeholder="שם תת-הקטגוריה"
//                             value={this.state.newSubcategoryName}
//                             onChange={this.onNewSubcategoryNameChange}
//                         />
//                     </Modal.Body>
//                     <Modal.Footer className="modalFooter">
//                         <Button bsStyle="success" onClick={this.addNewSubcategory}>המשך</Button>
//                     </Modal.Footer>
//                 </Modal>








// <Modal show={this.state.newItemNameModalIsOpen} onHide={this.onToggleNewItemName} dir="rtl">
//                     <Modal.Header bsClass="modalHeader" closeButton>
//                         <Modal.Title bsClass="modalTitle Heebo-Medium">
//                         הוספת אירוע חדש
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body bsClass="modalBody">
//                         <h4 className="Heebo-Regular">נא למלא שם לאירוע החדש</h4>
//                         <AutosizeInput
//                             className="events__tabs__button"
//                             type="text"
//                             placeholder="שם אירוע"
//                             value={this.state.newItemName}
//                             onChange={this.onNewItemNameChange}
//                         />
//                     </Modal.Body>
//                     <Modal.Footer className="modalFooter">
//                         <Button bsStyle="success" onClick={this.addNewItem}>המשך</Button>
//                     </Modal.Footer>
//                 </Modal>