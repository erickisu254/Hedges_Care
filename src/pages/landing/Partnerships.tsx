import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Globe, 
  HandHeart, 
  Award, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Download,
  FileText,
  Target
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Partner {
  id: string;
  name: string;
  type: 'ngo' | 'government' | 'university' | 'corporation';
  logo: string;
  description: string;
  impact: string;
  website: string;
  location: string;
  programs: string[];
}

interface DeploymentMetrics {
  totalFarmers: number;
  regionsServed: number;
  plantsAnalyzed: number;
  carbonSequestration: number; // tons of CO2 captured
}

const Partnerships = () => {
  const [contactForm, setContactForm] = useState({
    organization: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  
  const [metrics] = useState<DeploymentMetrics>({
    totalFarmers: 15420,
    regionsServed: 23,
    plantsAnalyzed: 89340,
    carbonSequestration: 2847.5 // tons of CO2 captured
  });

  const { t } = useLanguage();
  const { toast } = useToast();

  const partners: Partner[] = [
    {
      id: 'unep',
      name: 'United Nations Environment Programme',
      type: 'ngo',
      logo: '🌍',
      description: 'Leading global environmental authority that sets the global environmental agenda',
      impact: '150+ countries, 2.5M+ hectares reforested',
      website: 'https://www.unep.org',
      location: 'Global',
      programs: ['Billion Tree Campaign', 'Carbon Sequestration Initiative', 'Green Economy']
    },
    {
      id: 'world-resources-institute',
      name: 'World Resources Institute (WRI)',
      type: 'ngo',
      logo: '🌱',
      description: 'Global research organization that works on sustainable resource use',
      impact: '100M+ hectares of land under sustainable management',
      website: 'https://www.wri.org',
      location: 'United States (Global reach)',
      programs: ['Global Forest Watch', 'Food and Land Use', 'Carbon Program']
    },
    {
      id: 'african-green-wall',
      name: 'African Union Great Green Wall Initiative',
      type: 'government',
      logo: '🌳',
      description: 'Ambitious project to grow an 8,000 km natural wonder across Africa',
      impact: '100M+ hectares to be restored, 10M+ jobs created',
      website: 'https://www.greatgreenwall.org',
      location: 'Africa',
      programs: ['Land Restoration', 'Climate Resilience', 'Livelihood Creation']
    },
    {
      id: 'plant-for-the-planet',
      name: 'Plant-for-the-Planet',
      type: 'ngo',
      logo: '🌳',
      description: 'Youth-led movement focused on planting trees worldwide',
      impact: '15B+ trees planted, 200+ countries involved',
      website: 'https://www.plant-for-the-planet.org',
      location: 'Global',
      programs: ['Trillion Campaign', 'Youth Network', 'Ecosystem Restoration']
    },
    {
      id: 'we-forest',
      name: 'WeForest',
      type: 'ngo',
      logo: '🌿',
      description: 'Non-profit dedicated to sustainable forest restoration and conservation',
      impact: '450M+ trees planted, 500K+ hectares restored',
      website: 'https://www.weforest.org',
      location: 'Global',
      programs: ['Corporate Reforestation', 'Women in Forestry', 'Biodiversity Protection']
    },
    {
      id: 'kenya-forestry-service',
      name: 'Kenya Forest Service',
      type: 'government',
      logo: '🇰🇪',
      description: 'Government body responsible for forest conservation and management in Kenya',
      impact: '7.6% forest cover target, 50K+ hectares reforested annually',
      website: 'https://www.kenyaforestservice.org',
      location: 'Kenya',
      programs: ['National Forest Policy', 'Community Forest Associations', 'Urban Forestry']
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Partnership Inquiry Sent',
      description: 'We will review your proposal and get back to you within 48 hours.',
    });
    
    setContactForm({
      organization: '',
      email: '',
      phone: '',
      type: '',
      message: ''
    });
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'ngo': return 'bg-green-500';
      case 'government': return 'bg-blue-500';
      case 'university': return 'bg-purple-500';
      case 'corporation': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'ngo': return 'NGO';
      case 'government': return 'Government';
      case 'university': return 'University';
      case 'corporation': return 'Corporation';
      default: return 'Partner';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌱 Plant Carbon Partnerships
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with organizations to scale carbon sequestration through high-efficiency plant cultivation and reforestation
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {metrics.totalFarmers.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Clients Reached</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{metrics.regionsServed}</div>
              <div className="text-sm text-gray-600">Regions Served</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {metrics.plantsAnalyzed.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Plants Analyzed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{metrics.carbonSequestration.toLocaleString()}+</div>
              <div className="text-sm text-gray-600">Tons CO₂ Sequestered</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partners" className="gap-2">
              <Building2 className="h-4 w-4" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="programs" className="gap-2">
              <Target className="h-4 w-4" />
              Programs
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <FileText className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              Partner with Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{partner.logo}</div>
                        <div>
                          <div className="text-lg">{partner.name}</div>
                          <Badge className={getPartnerTypeColor(partner.type)}>
                            {getPartnerTypeLabel(partner.type)}
                          </Badge>
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {partner.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{partner.description}</p>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">Impact</div>
                      <div className="text-sm text-blue-600">{partner.impact}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Programs:</div>
                      <div className="flex flex-wrap gap-1">
                        {partner.programs.map((program, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => window.open(partner.website, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Urban Carbon Gardens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    High-efficiency plant cultivation for urban carbon sequestration
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• CO2-absorbing plant selection</li>
                    <li>• Urban space optimization</li>
                    <li>• Maintenance training programs</li>
                    <li>• Carbon tracking and reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Reforestation Initiatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Large-scale tree planting for carbon offset and ecosystem restoration
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Native species selection</li>
                    <li>• Drone-assisted planting</li>
                    <li>• Long-term monitoring systems</li>
                    <li>• Community engagement programs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    Research Partnership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Advanced research on high-carbon sequestration plant species
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Hybrid plant development</li>
                    <li>• Growth optimization studies</li>
                    <li>• Climate adaptation research</li>
                    <li>• Scientific publication collaboration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HandHeart className="h-5 w-5 text-orange-600" />
                    Community Forestry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Empowering local communities through sustainable forest management
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Skill development programs</li>
                    <li>• Sustainable harvesting techniques</li>
                    <li>• Micro-enterprise development</li>
                    <li>• Climate education initiatives</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Carbon Sequestration Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive guide on high-CO2 absorbing plant species and cultivation techniques
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plant Selection Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed database of plants optimized for carbon sequestration by climate zone
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Annual Impact Report 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Report showcasing carbon sequestration achievements and partnership outcomes
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Urban Gardening Toolkit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Resources for maximizing carbon capture in urban and small-space environments
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download ZIP
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reforestation Manual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Best practices for large-scale tree planting and ecosystem restoration
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Case studies from successful carbon sequestration projects worldwide
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Partnership Inquiry</CardTitle>
                  <CardDescription>
                    Tell us about your organization and how we can collaborate on plant-based carbon initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name</label>
                      <Input
                        value={contactForm.organization}
                        onChange={(e) => setContactForm(prev => ({ ...prev, organization: e.target.value }))}
                        placeholder="Your organization name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="contact@organization.org"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+254 7123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Type</label>
                      <select
                        value={contactForm.type}
                        onChange={(e) => setContactForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select organization type</option>
                        <option value="ngo">Non-Governmental Organization</option>
                        <option value="government">Government Agency</option>
                        <option value="university">University/Research Institution</option>
                        <option value="corporation">Corporation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Partnership Proposal</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your carbon sequestration project, target regions, expected CO2 reduction, and collaboration goals..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Submit Carbon Partnership Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Partnership Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Urban Green Corridors</h4>
                          <p className="text-sm text-gray-600">
                            Establish carbon-capturing green spaces in cities
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Globe className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Carbon Data Sharing</h4>
                          <p className="text-sm text-gray-600">
                            Contribute to global carbon sequestration databases
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Hybrid Plant Research</h4>
                          <p className="text-sm text-gray-600">
                            Develop high-efficiency carbon-capturing plant varieties
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <HandHeart className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Climate Grants</h4>
                          <p className="text-sm text-gray-600">
                            Collaborate on carbon offset and climate adaptation funding
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">phr3edevelopers@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">+254 722990587</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Kamakis, Along Eastern ByPass,Nairobi</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Partnerships;