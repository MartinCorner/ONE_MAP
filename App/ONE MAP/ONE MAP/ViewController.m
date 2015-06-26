//
//  ViewController.m
//  ONE MAP
//
//  Created by martin on 15/6/11.
//  Copyright (c) 2015年 martin. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    mainWebView = [[UIWebView alloc] initWithFrame: CGRectMake(0, 0, 320, 480)];
    
    
    NSURL* url = [[NSBundle bundleForClass: [self class]] URLForResource: @"index"
                                                           withExtension: @"html"
                                                            subdirectory: [@"page" stringByAppendingPathComponent: @"index"]];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.view addSubview: mainWebView];
    [mainWebView loadRequest:request];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
