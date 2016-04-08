#Serverless Elasticommerce Search Service
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
## Description
[Elasticommerce Services Option](https://amimoto-ami.com/plans/option-services/elasticommerce-services-option/) back end API.
It was made using [Serverless Framework](http://docs.serverless.com/v0.5.0/docs).
The relevance of search results and sales results to visualize.

## Architecture
<img src="https://raw.githubusercontent.com/megumiteam/serverless-elasticommerce-search-service/master/screenshot-2.png" title="screenshot"/>

## Setup
### Backend API
Setup your aws account profile in your local.
```
$ mkdir ~/.aws
$ vi ~/.aws/credentials
--
[default]
aws_access_key_id=<<access key>>
aws_secret_access_key=<<secret key>>
--
```

Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+. 
```
npm install serverless -g
```

Clone the project directly from Github:
```
git clone https://github.com/megumiteam/serverless-elasticommerce-search-service.git
```

Enter the serverless-elasticommerce-search-service folder that was just created:
```
cd serverless-elasticommerce-search-service
```

Install all npm dependencies:
```
npm install
```

Initialize the project:
```
serverless project init
```

Deploy your functions and endpoints:
```
serverless dash deploy
```

Endpoint information is displayed:
```
Serverless:   GET - searchword - https://example.com/dev/searchword  
Serverless:   POST - searchword - https://example.com/dev/searchword  
```

### Setting WooCommerce
- Install [WooCommerce](https://wordpress.org/plugins/woocommerce/) and [Elasticommerce Search Form](https://wordpress.org/plugins/elasticommerce-search-form/) Plugin vaersion 1.1 and over.
- Open `/wp-admin/options-general.php?page=wp_elasticsearch` in your browser
- Input Endpoint below:
<img src="https://raw.githubusercontent.com/megumiteam/serverless-elasticommerce-search-service/master/screenshot-3.png" title="screenshot"/>


## Sample Screen
<img src="https://raw.githubusercontent.com/megumiteam/serverless-elasticommerce-search-service/master/screenshot-1.png" title="screenshot"/>
