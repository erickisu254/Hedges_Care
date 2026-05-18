import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/AuthProvider";
import NFTCollection from "@/components/nft/NFTCollection";
import NFTCard from "@/components/nft/NFTCard";
import { nftService } from "@/services/nftService";
import { PlantNFT, UserNFTPortfolio } from "@/types/nft";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Calendar,
  Leaf,
  TreePine,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Zap,
  BookOpen,
  BarChart3,
  ShoppingCart,
  ArrowLeft
} from "lucide-react";

const NFTGallery: React.FC = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<UserNFTPortfolio | null>(null);
  const [allNFTs, setAllNFTs] = useState<PlantNFT[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date' | 'rarity'>('date');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('collection');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Initialize NFT service
        nftService.initialize();
        
        // Load user portfolio
        if (user) {
          const userPortfolio = await nftService.getUserPortfolio(user.id);
          setPortfolio(userPortfolio);
        }
        
        // Load all NFTs
        const allNFTsData = await nftService.getAllNFTs();
        setAllNFTs(allNFTsData);
        
        // Load collections
        const collectionsData = await nftService.getCollections();
        setCollections(collectionsData);
      } catch (error) {
        console.error('Error loading NFT data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Filter and sort NFTs
  const filteredNFTs = allNFTs
    .filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.speciesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.commonName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRarity = filterRarity === 'all' || nft.metadata.rarity === filterRarity;
      
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.marketData?.currentPrice || 0) - (b.marketData?.currentPrice || 0);
        case 'date':
          return new Date(b.metadata.scanDate).getTime() - new Date(a.metadata.scanDate).getTime();
        case 'rarity':
          const rarityOrder = { 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
          return (rarityOrder[b.metadata.rarity] || 0) - (rarityOrder[a.metadata.rarity] || 0);
        default:
          return 0;
      }
    });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500 text-white';
      case 'epic': return 'bg-purple-600 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Star className="h-4 w-4" />;
      case 'epic': return <Zap className="h-4 w-4" />;
      case 'rare': return <TreePine className="h-4 w-4" />;
      case 'uncommon': return <Leaf className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toFixed(3)} ${currency}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Plant NFT Gallery</h1>
          <p className="text-gray-600">Discover, collect, and trade unique plant NFTs representing environmental impact</p>
        </div>

        {/* User Portfolio Summary */}
        {portfolio && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-500" />
                Your NFT Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{portfolio.totalNFTs}</p>
                  <p className="text-sm text-gray-600">Total NFTs</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{formatPrice(portfolio.totalValue, 'ETH')}</p>
                  <p className="text-sm text-gray-600">Portfolio Value</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-lg font-semibold text-purple-600">
                    {portfolio.nfts.filter(nft => nft.metadata.rarity === 'legendary').length}
                  </p>
                  <p className="text-sm text-gray-600">Legendary</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-lg font-semibold text-amber-600">
                    {portfolio.nfts.filter(nft => nft.marketData?.listedForSale).length}
                  </p>
                  <p className="text-sm text-gray-600">Listed for Sale</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="collection">NFT Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            {/* Collection Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {collections.map((collection) => (
                <Card key={collection.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={collection.imageUrl} 
                        alt={collection.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-green-800">{collection.name}</h3>
                        <p className="text-sm text-gray-600">{collection.mintedCount} minted</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatPrice(collection.floorPrice, 'ETH')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search NFTs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Sort and Filter */}
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="rarity">Rarity</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterRarity} onValueChange={setFilterRarity}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Rarities</SelectItem>
                        <SelectItem value="legendary">Legendary</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                        <SelectItem value="uncommon">Uncommon</SelectItem>
                        <SelectItem value="common">Common</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-lg">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NFT Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {filteredNFTs.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  showActions={true}
                  currentOwner={portfolio?.nfts.some(p => p.id === nft.id)}
                />
              ))}
            </div>

            {filteredNFTs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFTs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Marketplace Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Listed NFTs</p>
                      <p className="text-2xl font-bold text-green-600">{allNFTs.filter(nft => nft.marketData?.listedForSale).length}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Volume</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(allNFTs.filter(nft => nft.marketData?.lastSalePrice).reduce((sum, nft) => sum + (nft.marketData?.lastSalePrice || 0), 0), 'ETH')}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Price</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatPrice(allNFTs.filter(nft => nft.marketData?.currentPrice).reduce((sum, nft) => sum + (nft.marketData?.currentPrice || 0), 0) / Math.max(1, allNFTs.filter(nft => nft.marketData?.currentPrice).length), 'ETH')}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Floor Price</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {formatPrice(Math.min(...allNFTs.filter(nft => nft.marketData?.currentPrice).map(nft => nft.marketData?.currentPrice || Infinity)), 'ETH')}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Marketplace NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allNFTs.filter(nft => nft.marketData?.listedForSale).map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  showActions={true}
                  currentOwner={portfolio?.nfts.some(p => p.id === nft.id)}
                />
              ))}
            </div>

            {allNFTs.filter(nft => nft.marketData?.listedForSale).length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFTs available</h3>
                  <p className="text-gray-500">No NFTs are currently listed for sale in the marketplace</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            {portfolio ? (
              <>
                {/* Portfolio Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Wallet className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">{portfolio.totalNFTs}</p>
                      <p className="text-sm text-gray-600">Total NFTs</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{formatPrice(portfolio.totalValue, 'ETH')}</p>
                      <p className="text-sm text-gray-600">Total Value</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-lg font-semibold text-purple-600">
                        {portfolio.nfts.filter(nft => nft.metadata.rarity === 'legendary').length}
                      </p>
                      <p className="text-sm text-gray-600">Legendary</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-lg font-semibold text-amber-600">
                        {portfolio.recentTrades.length}
                      </p>
                      <p className="text-sm text-gray-600">Recent Trades</p>
                    </CardContent>
                  </Card>
                </div>

                {/* NFT Collection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.nfts.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      showActions={true}
                      currentOwner={true}
                    />
                  ))}
                </div>

                {portfolio.nfts.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFTs in portfolio</h3>
                      <p className="text-gray-500">Start collecting plant NFTs by minting them from your plant scans</p>
                      <Button className="mt-4" onClick={() => setActiveTab('collection')}>
                        Browse Collection
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Connect Wallet</h3>
                  <p className="text-gray-500">Connect your wallet to view your NFT portfolio</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NFTGallery;