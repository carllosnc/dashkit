import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Tabs/Tabs';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Divider } from '../../components/Divider/Divider';
import { Surface } from '../../components/Surface/Surface';
import {
  FiCreditCard,
  FiShield,
  FiUser,
  FiCalendar,
  FiCpu,
  FiArrowRight,
  FiCheckCircle,
  FiInfo
} from 'react-icons/fi';

export const PaymentPageExample = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cryptoCurrency, setCryptoCurrency] = useState('btc');

  const cryptoOptions = [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'sol', label: 'Solana (SOL)' },
    { value: 'usdc', label: 'USD Coin (USDC)' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Helmet>
        <title>Payment Page Example | Dashkit UI</title>
        <meta name="description" content="A premium payment checkout interface with Credit Card and Crypto options, built purely with Dashkit components." />
      </Helmet>
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20 flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="text-muted-foreground text-lg">
            Complete your purchase by selecting a payment method and reviewing your order details.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList>
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <FiCreditCard size={16} />
                  Credit Card
                </TabsTrigger>
                <TabsTrigger value="crypto" className="flex items-center gap-2">
                  <FiCpu size={16} />
                  Crypto Assets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                  <Input
                    label="Cardholder Name"
                    placeholder="Johnathan Doe"
                    leftIcon={<FiUser />}
                  />
                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    leftIcon={<FiCreditCard />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      leftIcon={<FiCalendar />}
                    />
                    <Input
                      label="CVC / CVV"
                      placeholder="•••"
                      leftIcon={<FiShield />}
                      type="password"
                    />
                  </div>
                  <Checkbox
                    label="Save card for future purchases"
                    description="Your card details will be stored securely for faster checkouts."
                  />
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="flex flex-col gap-6 animate-in slide-in-from-left-2 duration-300">
                  <Select
                    label="Select Asset"
                    options={cryptoOptions}
                    value={cryptoCurrency}
                    onChange={setCryptoCurrency}
                    description="Transaction fees vary by network."
                  />
                  <div className="p-6 bg-ds-100/50 dark:bg-ds-800 ds-rounded border border-dashed flex flex-col items-center text-center gap-4">
                      <div className="size-24 bg-card border border-border flex items-center justify-center ds-rounded-md">
                        <FiCpu size={48} className="text-ds-400 opacity-20" />
                      </div>
                      <div className="flex flex-col gap-1 overflow-hidden w-full">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Wallet Address</span>
                        <p className="text-sm font-mono truncate text-ds-900 dark:text-ds-50 px-4">
                          {cryptoCurrency === 'btc' ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                        </p>
                      </div>
                      <Button variant="outlined" size="sm">Copy Address</Button>
                  </div>
                  <Surface variant="info" className="flex items-start gap-3 p-4">
                    <FiInfo className="text-ds-info-600 dark:text-ds-info-400 size-5 shrink-0 mt-0.5" />
                    <p className="text-sm text-ds-info-800 dark:text-ds-info-200 leading-relaxed">
                      Waiting for network confirmation. Once detected, your transaction will blink green and complete automatically.
                    </p>
                  </Surface>
                </div>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
                <CardDescription>
                  Enter the address associated with your payment method.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Country" defaultValue="United States" />
                  <Input label="State / Province" placeholder="California" />
                </div>
                <Input label="Street Address" placeholder="123 Design Avenue" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="City" placeholder="San Francisco" />
                  <Input label="ZIP / Postal Code" placeholder="94103" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review items and final total.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dashkit UI Pro License</span>
                    <span className="font-medium">$149.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Premium Support (1 Year)</span>
                    <span className="font-medium">$49.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applicable Tax</span>
                    <span className="font-medium">$15.84</span>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-ds-primary-600">$213.84</span>
                </div>
                <Button className="w-full" size="lg" variant="filled" rightIcon={<FiArrowRight />}>
                  Complete Payment
                </Button>
                <p className="text-xs text-center text-muted-foreground leading-relaxed">
                  By clicking "Complete Payment", you agree to our Terms of Service and Privacy Policy. All payments are securely processed.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 p-6 ds-rounded border border-dashed">
               <div className="flex items-center gap-3">
                 <div className="size-8 rounded-full bg-ds-success-500/10 text-ds-success-600 flex items-center justify-center shrink-0">
                    <FiCheckCircle size={18} />
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-ds-900 dark:text-ds-50 leading-none">Secure Transaction</span>
                    <span className="text-xs text-muted-foreground">256-bit SSL Encryption Active</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
