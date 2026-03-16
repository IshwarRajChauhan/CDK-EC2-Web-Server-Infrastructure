import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { readFileSync } from 'fs';

export class WebserverStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //vpc
    const demoVPC = new ec2.Vpc(this,'demoVPC',{
      vpcName:'demoVPC',
      ipAddresses:ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways:0
    });

    //security group
    const demoSG = new ec2.SecurityGroup(this,'dempSG',{
      vpc: demoVPC,
      securityGroupName:'allow http trafic',
      allowAllIpv6Outbound:true
    });

    demoSG.addEgressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(80),'allow http trafic')

    //EC2 Instance
    const demoEC2 = new ec2.Instance(this,'Demoec2',{
      vpc:demoVPC,
      vpcSubnets:{subnetType:ec2.SubnetType.PUBLIC},
      securityGroup:demoSG,
      instanceType:ec2.InstanceType.of(ec2.InstanceClass.T3,ec2.InstanceSize.MICRO),
      machineImage:ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      keyName:'MYKEYPAIR'
    })
      
    //user data
    const userdata = readFileSync('./lib/userdata.sh','utf-8');
        demoEC2.addUserData(userdata);

  }
}
