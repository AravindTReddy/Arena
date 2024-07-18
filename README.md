# Arena

Arena is a cross-platform compatible mobile and web application built using React Native, designed for both Android and iOS. It provides enriched monitoring and informed decision-making in electrical enclaves by combining physical measurements with cloud processing power.

## Features

- **Dynamic Dashboard**: Users can customize their dashboards to display the most relevant data and insights.
- **Sensors Management**: Create, customize, and manage sensor devices.
- **Real-time Updates**: Continuously captures electrical measurements using advanced sensors.
- **User Authentication**: Secure login and role-based access control.

## Technologies Used

- **Frontend**: ReactNative, React Router, Styled Components, Material UI.
- **Backend**: Node.js, Express.js
- **Database**: Amazon RDS, InfluxDB
- **Real-time Communication**: MQTT, AWS IoTCORE
- **Cloud Services**: AWS 

## AWS Services Used

In this project, the following AWS services were utilized to enhance functionality and performance:

- **AWS IoT Core**: For secure, bi-directional communication between the Arena sensors and the cloud.
- **AWS MQTT**: To enable real-time messaging and updates.
- **AWS RDS**: For relational database services to manage data storage.
- **AWS API Gateway**: To create, publish, maintain, monitor, and secure APIs.
- **AWS Lambda**: For running backend code in response to events and HTTP requests without provisioning servers.
- **Amazon S3**: For storing static assets and build files.
- **AWS IAM**: For managing access to AWS services and resources securely.
- **AWS CloudFormation**: For provisioning and managing infrastructure as code.
- **AWS Cognito**: For user authentication and authorization, providing secure access to the platform.
- **AWS Amplify**: For deploying and managing the frontend application with ease.
- **Amazon CloudWatch**: For monitoring and logging application metrics and logs, ensuring operational health.

## SDKs Used

The project utilizes various SDKs to interact with cloud services programmatically:

- **AWS SDK for Node.js**: Used to interact with AWS services such as RDS, S3, and more, enabling server-side operations.
  
## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- AWS account for cloud services setup

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/Arena.git
   cd Arena
   npm install
   npm start
2. **Start the Metro Bundler**:
   ```bash
   npm start
   npm run android
   npm run ios

### Usage

    User Authentication: Sign up or log in to access the platform.
    Dashboard: View real-time updates and manage Arena sensor devices.

