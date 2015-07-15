//
//  VSViewController.m
//  VeevaSimulator
//
//  Created by Legend on 13-11-7四.
//  Copyright (c) 2013年 EReach. All rights reserved.
//

#import "VSViewController.h"

@interface VSViewController ()<UIWebViewDelegate, UIDocumentInteractionControllerDelegate>
{
    UIWebView *_webView;
}

@end

@implementation VSViewController

@synthesize webView = _webView;

- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
    [self loadContent];
}

- (void)loadContent
{
    NSURL* url = [[NSBundle bundleForClass: [self class]] URLForResource: @"index"
                                                           withExtension: @"html"
                                                            subdirectory: [@"" stringByAppendingPathComponent: @"page"]];
    
    [self->_webView loadRequest: [NSURLRequest requestWithURL: url]];
}
@end