import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Layout, LayoutItem } from '../../components/ui/layout'
import { MarketingHeader, MarketingHeaderActions, MarketingHeaderBranding } from '../../components/marketing/marketing-header'
import { MarketingFooter, MarketingFooterTagline, MarketingFooterNav, MarketingFooterNavGroup, MarketingFooterNavGroupLabel, MarketingFooterNavItem } from '../../components/marketing/marketing-footer'
import KeeperLogo from "../../assets/keeper.svg?react";
import { ButtonIcon, ButtonText, ExternalLinkButton, LinkButton } from '../../components/ui/button';
import { HeartIcon, StarIcon } from 'lucide-react';

export const Route = createFileRoute('/(marketing)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <LayoutItem>
        <MarketingHeader>
          <MarketingHeaderBranding>
            <KeeperLogo className="max-w-6" />
          </MarketingHeaderBranding>
          <MarketingHeaderActions>
            <ExternalLinkButton size="compact" variant="ghost" href="https://github.com" target="_blank" rel="noreferrer">
              <ButtonIcon>
                <StarIcon size={14} />
              </ButtonIcon>
              <ButtonText>403</ButtonText>
            </ExternalLinkButton>
            <LinkButton size="compact" variant="border" to="/login">
              <ButtonText>Login</ButtonText>
            </LinkButton>
            <LinkButton size="compact" variant="highlight" to="/register">
              <ButtonText>Register</ButtonText>
            </LinkButton>
          </MarketingHeaderActions>
        </MarketingHeader>
      </LayoutItem>
      <LayoutItem>
        <main>
          <Outlet />
        </main>
      </LayoutItem>
      <LayoutItem>
        <MarketingFooter>
          <MarketingFooterTagline>
            Made with <HeartIcon size={12} className="inline text-red-500 fill-red-500 relative -top-px" /> by Rida F'kih
          </MarketingFooterTagline>
          <MarketingFooterNav>
            <MarketingFooterNavGroup>
              <MarketingFooterNavGroupLabel>Product</MarketingFooterNavGroupLabel>
              <MarketingFooterNavItem>Get Started</MarketingFooterNavItem>
              <MarketingFooterNavItem>Features</MarketingFooterNavItem>
              <MarketingFooterNavItem>Pricing</MarketingFooterNavItem>
            </MarketingFooterNavGroup>
            <MarketingFooterNavGroup>
              <MarketingFooterNavGroupLabel>Resources</MarketingFooterNavGroupLabel>
              <MarketingFooterNavItem>Documentation</MarketingFooterNavItem>
              <MarketingFooterNavItem>Changelog</MarketingFooterNavItem>
              <MarketingFooterNavItem>GitHub</MarketingFooterNavItem>
            </MarketingFooterNavGroup>
            <MarketingFooterNavGroup>
              <MarketingFooterNavGroupLabel>Legal</MarketingFooterNavGroupLabel>
              <MarketingFooterNavItem>Privacy Policy</MarketingFooterNavItem>
              <MarketingFooterNavItem>Terms of Service</MarketingFooterNavItem>
            </MarketingFooterNavGroup>
          </MarketingFooterNav>
        </MarketingFooter>
      </LayoutItem>
    </Layout>
  )
}
